import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Cargar variables de entorno
config();

async function addIsPrincipalColumn() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Connected to database');

    // Verificar si la columna ya existe
    const columnExists: any = await dataSource.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'images' AND column_name = 'isPrincipal'
    `);

    if (columnExists.length === 0) {
      // Agregar la columna si no existe
      await dataSource.query(`
        ALTER TABLE "images" ADD "isPrincipal" boolean NOT NULL DEFAULT false
      `);
      console.log('Column isPrincipal added successfully');
    } else {
      console.log('Column isPrincipal already exists');
    }

    // Insertar las migraciones en la tabla si no existen
    const migrations = [
      { timestamp: 1753750042000, name: 'AddTipoToVehicle1753750042000' },
      { timestamp: 1753762800000, name: 'AddPasswordResetFields1753762800000' },
      { timestamp: 1754169600000, name: 'AddEmailToUser1754169600000' },
      { timestamp: 1754370000000, name: 'AddIsPrincipalToImage1754370000000' },
    ];

    for (const migration of migrations) {
      const exists: any = await dataSource.query(
        `SELECT * FROM migrations WHERE name = $1`,
        [migration.name],
      );

      if (exists.length === 0) {
        await dataSource.query(
          `INSERT INTO migrations (timestamp, name) VALUES ($1, $2)`,
          [migration.timestamp, migration.name],
        );
        console.log(`Migration ${migration.name} recorded`);
      } else {
        console.log(`Migration ${migration.name} already exists`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dataSource.destroy();
  }
}

void addIsPrincipalColumn();
