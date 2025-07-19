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
        ? [
            'https://nextcar-dashboard-api.onrender.com',
            'https://www.nextcar-dashboard-api.onrender.com',
            // Agregar aquí el dominio del frontend cuando esté listo
          ]
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
    .setTitle('NEXTCAR Dashboard API')
    .setDescription(
      `
    API completa para la gestión de vehículos y contactos del dashboard NEXTCAR.
    
    ## Funcionalidades principales:
    - **Gestión de vehículos**: CRUD completo con más de 50 campos de especificaciones
    - **Sistema de imágenes**: Upload y gestión de imágenes de vehículos
    - **Formulario de contacto**: Sistema de consultas con rate limiting
    - **Dashboard administrativo**: Panel protegido con JWT para administradores
    - **API pública**: Endpoints públicos con filtros y paginación
    
    ## Autenticación:
    - Los endpoints del dashboard requieren JWT token
    - Usar el endpoint /auth/login para obtener el token
    - Incluir el token en el header: Authorization: Bearer <token>
    
    ## Rate Limiting:
    - Endpoints públicos tienen limitaciones de velocidad
    - Contactos: 5 requests/5min
    - Vehículos: 100 requests/min
    - Filtros: 20 requests/min
    `,
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Ingresa el JWT token obtenido del endpoint /auth/login',
      in: 'header',
    })
    .addServer('http://localhost:3000', 'Desarrollo')
    .addServer(
      'https://nextcar-dashboard-api.onrender.com',
      'Producción (Render)',
    )
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
