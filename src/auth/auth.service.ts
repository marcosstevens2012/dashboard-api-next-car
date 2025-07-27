import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export interface LoginDto {
  username: string;
  password: string;
}

export interface JwtPayload {
  username: string;
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
  async createUser(username: string, password: string, role: string = 'admin') {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username,
      password: hashedPassword,
      role,
    };

    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
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
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
