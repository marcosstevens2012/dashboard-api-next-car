import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { User } from '../entities/user.entity';

export interface LoginDto {
  username: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface JwtPayload {
  username: string;
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (user && user.isActive) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async validateToken(userId: string) {
    console.log('🔍 Validating JWT for user ID:', userId);

    // Validate UUID format before querying database
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(userId)) {
      console.warn(`❌ Invalid UUID format in JWT payload: ${userId}`);
      return null;
    }

    console.log('✅ UUID format is valid, querying database');

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (user) {
      console.log('✅ User found and validated');
      return {
        id: user.id,
        username: user.username,
        role: user.role,
      };
    }
    console.log('❌ User not found or inactive');
    return null;
  }

  // Métodos adicionales para gestión de usuarios
  async createUser(
    username: string,
    email: string,
    password: string,
    role: string = 'admin',
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
      isActive: savedUser.isActive,
      createdAt: savedUser.createdAt,
    };
  }

  async updatePassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(userId, { password: hashedPassword });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    return {
      id: user!.id,
      username: user!.username,
      role: user!.role,
      updatedAt: user!.updatedAt,
    };
  }

  async deactivateUser(userId: string) {
    await this.userRepository.update(userId, { isActive: false });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    return {
      id: user!.id,
      username: user!.username,
      isActive: user!.isActive,
    };
  }

  async findAllUsers() {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });

    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  // Métodos para cambio y recuperación de contraseña
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    // Actualizar contraseña
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );
    await this.userRepository.update(userId, { password: hashedNewPassword });

    return {
      message: 'Contraseña actualizada exitosamente',
      timestamp: new Date(),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user || !user.email) {
      // Por seguridad, no revelamos si el usuario existe o no
      return {
        message:
          'Si el email existe, se enviará un email con instrucciones para recuperar la contraseña',
      };
    }

    // Generar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos

    await this.userRepository.update(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpires,
    });

    // Enviar email de recuperación
    try {
      await this.emailService.sendPasswordResetEmail(user.email, resetToken);

      return {
        message:
          'Si el email existe, se enviará un email con instrucciones para recuperar la contraseña',
      };
    } catch (error) {
      console.error('Error enviando email de recuperación:', error);

      // En caso de error al enviar email, devolvemos el mensaje genérico
      // pero también podríamos limpiar el token si queremos
      return {
        message:
          'Si el email existe, se enviará un email con instrucciones para recuperar la contraseña',
        // En desarrollo, mostrar el token si no se puede enviar email
        ...(process.env.NODE_ENV === 'development' && {
          developmentToken: resetToken,
        }),
      };
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        resetPasswordToken: resetPasswordDto.token,
      },
    });

    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('Token de reset inválido o expirado');
    }

    // Actualizar contraseña y limpiar token
    const hashedNewPassword = await bcrypt.hash(
      resetPasswordDto.newPassword,
      10,
    );
    await this.userRepository.update(user.id, {
      password: hashedNewPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });

    return {
      message: 'Contraseña restablecida exitosamente',
      timestamp: new Date(),
    };
  }
}
