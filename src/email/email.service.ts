import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('EMAIL_PORT', 587),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM', 'noreply@nextcar.com'),
      to: email,
      subject: 'Recuperación de Contraseña - NextCar Dashboard',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Recuperación de Contraseña</h2>
          <p>Hola,</p>
          <p>Has solicitado restablecer tu contraseña para el Dashboard de NextCar.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
            Restablecer Contraseña
          </a>
          <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
          <p><strong>Este enlace expirará en 30 minutos.</strong></p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Este es un email automático, por favor no respondas a este mensaje.
          </p>
        </div>
      `,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado exitosamente:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error enviando email:', error);
      throw new Error('No se pudo enviar el email de recuperación');
    }
  }
}
