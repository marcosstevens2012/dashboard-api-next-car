import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as entities from './entities';

// Cargar variables de entorno
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  entities: Object.values(entities),
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Siempre false para migraciones
  logging:
    process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});
