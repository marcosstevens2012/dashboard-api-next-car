import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Seguridad con Helmet
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false, // Para permitir imágenes
    }),
  );

  // Habilitar CORS de forma más específica
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://tu-dominio.com', 'https://www.tu-dominio.com'] // Cambiar en producción
        : true, // Permitir todas las origins para desarrollo
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV === 'production', // Ocultar detalles en producción
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Dashboard API')
    .setDescription('API para administrar vehículos y contactos')
    .setVersion('1.0')
    .addBearerAuth() // Para JWT en Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configurar archivos estáticos para servir imágenes
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
  console.log(`🔒 Public API: http://localhost:${port}/public`);
  console.log(
    `🔐 Dashboard API: http://localhost:${port}/dashboard (requires JWT)`,
  );
}
void bootstrap();
