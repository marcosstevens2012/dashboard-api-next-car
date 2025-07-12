# Configuración para Producción

## Render.com Setup

### 1. Conectar repositorio a Render

1. Ve a [render.com](https://render.com)
2. Conecta tu cuenta de GitHub
3. Crea un nuevo "Web Service"
4. Conecta este repositorio

### 2. Configurar variables de entorno en Render:

```
NODE_ENV=production
JWT_SECRET=tu-jwt-secret-super-seguro-aqui
DATABASE_URL=postgresql://username:password@hostname:port/database
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

### 3. Configurar Cloudinary

1. Ve a [cloudinary.com](https://cloudinary.com)
2. Crea una cuenta gratuita
3. Copia las credenciales del dashboard
4. Pégalas en las variables de entorno de Render

### 4. Base de datos

Render incluye PostgreSQL gratuito:

1. En Render, crea una "PostgreSQL Database"
2. Copia la URL de conexión externa
3. Úsala como DATABASE_URL

### 5. Build y Deploy

Render automáticamente:

- Ejecutará `npm install`
- Ejecutará `npm run build`
- Ejecutará las migraciones de Prisma
- Iniciará el servidor

## Railway Setup (Alternativo)

### 1. Conectar a Railway

```bash
npx @railway/cli login
npx @railway/cli init
npx @railway/cli up
```

### 2. Variables de entorno similares

Configura las mismas variables en Railway dashboard

## Vercel + Supabase (Alternativo)

### 1. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Obtener URL de PostgreSQL
3. Configurar Storage para imágenes

### 2. Deploy en Vercel

```bash
vercel --prod
```

## Notas importantes:

- Cloudinary tiene tier gratuito de 25GB/mes
- Render tiene 750 horas gratis/mes
- Railway tiene $5 de crédito gratis
- Siempre usa variables de entorno para credenciales
