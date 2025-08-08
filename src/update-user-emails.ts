import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function updateUsersWithEmails() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  try {
    console.log('🔄 Iniciando actualización de usuarios...');

    // Obtener todos los usuarios
    const users = await authService.findAllUsers();
    console.log(`📋 Encontrados ${users.length} usuarios`);

    for (const user of users) {
      if (!user.email) {
        // Generar email basado en username
        const generatedEmail = `${user.username}@nextcar.local`;

        console.log(
          `📧 Actualizando usuario "${user.username}" con email: ${generatedEmail}`,
        );

        // Aquí necesitarías un método para actualizar el email
        // await authService.updateUserEmail(user.id, generatedEmail);
      } else {
        console.log(
          `✅ Usuario "${user.username}" ya tiene email: ${user.email}`,
        );
      }
    }

    console.log('✅ Actualización completada');
  } catch (error) {
    console.error('❌ Error durante la actualización:', error);
  } finally {
    await app.close();
  }
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  updateUsersWithEmails();
}
