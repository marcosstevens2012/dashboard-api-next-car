import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const authService = app.get(AuthService);

  try {
    // Crear usuario admin por defecto
    const existingUsers = await authService.findAllUsers();

    if (existingUsers.length === 0) {
      await authService.createUser('admin', 'dashboard123', 'admin');
      console.log('✅ Usuario admin creado exitosamente');
      console.log('📧 Username: admin');
      console.log('🔑 Password: dashboard123');
      console.log('⚠️  Recuerda cambiar la contraseña en producción');
    } else {
      console.log('ℹ️  Ya existen usuarios en la base de datos');
    }
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error);
  }

  await app.close();
}

seed().catch((error) => {
  console.error('❌ Error en el proceso de seed:', error);
  process.exit(1);
});
