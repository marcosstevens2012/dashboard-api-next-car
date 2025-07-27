# Migración de Prisma a TypeORM con Supabase - Dashboard API

Este proyecto ha sido migrado exitosamente de Prisma ORM a TypeORM con PostgreSQL en Supabase.

## Configuración de la Base de Datos

### 1. Configuración de Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea un nuevo proyecto
2. Ve a Settings > Database en tu proyecto
3. Copia la Connection String (URI) o las credenciales individuales

### 2. Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura:

**Opción 1: Usando DATABASE_URL (recomendado)**

```bash
# Database URL de Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NODE_ENV=development

# JWT Secret
JWT_SECRET=tu-clave-secreta-jwt

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=tu_cloudinary_cloud_name
CLOUDINARY_API_KEY=tu_cloudinary_api_key
CLOUDINARY_API_SECRET=tu_cloudinary_api_secret

# Port
PORT=3001
```

**Opción 2: Variables separadas**

```bash
DATABASE_HOST=db.[YOUR-PROJECT-REF].supabase.co
DATABASE_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=[YOUR-PASSWORD]
DB_DATABASE=postgres
NODE_ENV=development
```

### 3. Sincronización Automática

TypeORM está configurado para:

- **Desarrollo**: `synchronize: true` - Crea/actualiza tablas automáticamente
- **Producción**: SSL habilitado para Supabase

⚠️ **Importante**: En producción, considera usar migraciones manuales en lugar de sincronización automática.

## Cambios Principales

### Configuración TypeORM para PostgreSQL

En `src/app.module.ts`:

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get('DATABASE_URL'),
    autoLoadEntities: true,
    synchronize: configService.get('NODE_ENV') === 'development',
    ssl:
      configService.get('NODE_ENV') === 'production'
        ? { rejectUnauthorized: false }
        : false,
    logging:
      configService.get('NODE_ENV') === 'development'
        ? ['query', 'error']
        : ['error'],
  }),
  inject: [ConfigService],
});
```

### Entidades Optimizadas para PostgreSQL

- **UUIDs**: Todas las entidades usan `@PrimaryGeneratedColumn('uuid')`
- **Tipos de datos**: Optimizados para PostgreSQL (ej: `decimal` para precios)
- **Relaciones**: Configuradas con `cascade` y `onDelete`

### Estructura de Base de Datos

Las siguientes tablas se crearán automáticamente:

- `vehicles` - Información de vehículos
- `images` - Imágenes de vehículos (con Cloudinary URLs)
- `videos` - Videos de vehículos (con Cloudinary URLs)
- `contacts` - Formularios de contacto
- `users` - Usuarios del sistema

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar .env con tu DATABASE_URL de Supabase

# Ejecutar en desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm run start:prod
```

## Ventajas de Supabase + TypeORM

### 1. **Supabase Benefits**

- Base de datos PostgreSQL managed
- Escalabilidad automática
- Backups automáticos
- Dashboard de administración
- API REST automática (opcional)
- Real-time subscriptions (opcional)

### 2. **TypeORM Benefits**

- ORM maduro y estable
- Soporte nativo para PostgreSQL
- Query Builder avanzado
- Decoradores para entidades
- Soporte para migraciones
- Compatible con múltiples bases de datos

### 3. **Consultas Ejemplo**

**Consulta simple:**

```typescript
await this.vehicleRepository.find({
  where: { destacado: true },
  relations: ['images'],
  order: { createdAt: 'DESC' },
});
```

**Query Builder para consultas complejas:**

```typescript
const result = await this.vehicleRepository
  .createQueryBuilder('vehicle')
  .leftJoinAndSelect('vehicle.images', 'images')
  .where('vehicle.precio BETWEEN :min AND :max', { min: 10000, max: 50000 })
  .andWhere('vehicle.marca = :marca', { marca: 'Toyota' })
  .orderBy('vehicle.createdAt', 'DESC')
  .getMany();
```

**Consultas con agregaciones:**

```typescript
const stats = await this.vehicleRepository
  .createQueryBuilder('vehicle')
  .select('vehicle.marca', 'marca')
  .addSelect('COUNT(*)', 'count')
  .addSelect('AVG(vehicle.precio)', 'avgPrice')
  .groupBy('vehicle.marca')
  .getRawMany();
```

## Migración a Producción

### Variables de Entorno de Producción:

```bash
NODE_ENV=production
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
JWT_SECRET="tu-clave-super-secreta-de-produccion"
```

### Consideraciones:

1. **SSL**: Automáticamente habilitado en producción
2. **Sincronización**: Considera deshabilitar y usar migraciones
3. **Logging**: Solo errores en producción
4. **Connection Pooling**: Supabase maneja esto automáticamente

## Dependencias

**Añadidas:**

- `@nestjs/typeorm`
- `typeorm`
- `pg` (PostgreSQL driver)
- `@types/pg`

**Removidas:**

- `@prisma/client`
- `prisma`
- `mysql2`

## Cambios Principales

### Entidades TypeORM

Las entidades se encuentran en `src/entities/`:

- `vehicle.entity.ts` - Entidad de vehículos
- `image.entity.ts` - Entidad de imágenes
- `video.entity.ts` - Entidad de videos
- `contact.entity.ts` - Entidad de contactos
- `user.entity.ts` - Entidad de usuarios

### Configuración TypeORM

En `src/app.module.ts`, TypeORM está configurado con:

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DATABASE_HOST') || 'localhost',
    port: parseInt(configService.get('DATABASE_PORT') || '3306', 10),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    autoLoadEntities: true,
    synchronize: configService.get('NODE_ENV') === 'development',
    logging:
      configService.get('NODE_ENV') === 'development'
        ? ['query', 'error']
        : ['error'],
  }),
  inject: [ConfigService],
});
```

### Servicios Actualizados

Todos los servicios han sido actualizados para usar repositories de TypeORM:

- `VehiclesService` - Usa `Repository<Vehicle>`
- `ImagesService` - Usa `Repository<Image>`
- `VideosService` - Usa `Repository<Video>`
- `ContactsService` - Usa `Repository<Contact>`
- `AuthService` - Usa `Repository<User>`

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus configuraciones

# Ejecutar en desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm run start:prod
```

## Diferencias con Prisma

### Consultas

**Antes (Prisma):**

```typescript
await this.prisma.vehicle.findMany({
  where: { destacado: true },
  include: { images: true },
  orderBy: { createdAt: 'desc' },
});
```

**Ahora (TypeORM):**

```typescript
await this.vehicleRepository.find({
  where: { destacado: true },
  relations: ['images'],
  order: { createdAt: 'DESC' },
});
```

### Consultas Complejas

Para consultas más complejas, TypeORM ofrece QueryBuilder:

```typescript
const result = await this.vehicleRepository
  .createQueryBuilder('vehicle')
  .select('vehicle.marca', 'marca')
  .addSelect('COUNT(*)', 'count')
  .groupBy('vehicle.marca')
  .orderBy('count', 'DESC')
  .getRawMany();
```

### Creación de Registros

**Antes (Prisma):**

```typescript
await this.prisma.vehicle.create({
  data: vehicleData,
});
```

**Ahora (TypeORM):**

```typescript
const vehicle = this.vehicleRepository.create(vehicleData);
await this.vehicleRepository.save(vehicle);
```

## Migración a Producción

Para producción, recomendamos:

1. Cambiar `synchronize: false` en la configuración
2. Crear migraciones manuales usando TypeORM CLI
3. Usar variables de entorno específicas de producción
4. Configurar SSL si es necesario

## Dependencias

Las siguientes dependencias de TypeORM han sido añadidas:

- `@nestjs/typeorm`
- `typeorm`
- `mysql2`

Las siguientes dependencias de Prisma han sido removidas:

- `@prisma/client`
- `prisma`

## Scripts Actualizados

Los scripts relacionados con Prisma han sido removidos del `package.json`:

- `db:migrate`
- `db:generate`
- `db:studio`
- `db:seed`
- `db:reset`

Con TypeORM, la gestión de la base de datos se maneja a través de la configuración y migraciones de TypeORM.
