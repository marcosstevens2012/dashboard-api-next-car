import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      this.logger.log('🔄 Connecting to database...');
      this.logger.log(
        `📍 DATABASE_URL: ${process.env.DATABASE_URL ? 'SET' : 'NOT SET'}`,
      );

      if (process.env.DATABASE_URL) {
        // Enmascarar la URL para logs seguros
        const url = new URL(process.env.DATABASE_URL);
        this.logger.log(`🗄️ Database Host: ${url.hostname}:${url.port}`);
        this.logger.log(`🗄️ Database Name: ${url.pathname.substring(1)}`);
      }

      // Try to connect with timeout
      const connectPromise = this.$connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 10000),
      );

      await Promise.race([connectPromise, timeoutPromise]);
      this.logger.log('✅ Database connected successfully');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorCode =
        typeof error === 'object' && error !== null && 'code' in error
          ? String(error.code)
          : 'Unknown';

      this.logger.error('❌ Failed to connect to database:', errorMessage);
      this.logger.error('🔍 Error Code:', errorCode);
      throw error;
    }
  }
}
