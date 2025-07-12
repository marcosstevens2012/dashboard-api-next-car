# 🚀 Guía Completa: Deploy en Render

## ✅ PASO 1: Configurar Render

### 1.1 Crear cuenta en Render
1. Ve a **[render.com](https://render.com)**
2. Haz clic en **"Get Started for Free"**
3. Puedes registrarte con GitHub (recomendado) o email

### 1.2 Conectar tu repositorio
1. Una vez logueado, haz clic en **"New +"** 
2. Selecciona **"Web Service"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Busca y selecciona tu repositorio: **`dashboard-api`**
5. Haz clic en **"Connect"**

### 1.3 Configurar el servicio
En la página de configuración:

#### Basic Settings:
- **Name**: `nextcar-dashboard-api` (o el que prefieras)
- **Region**: `US West (Oregon)` (recomendado)
- **Branch**: `master`
- **Runtime**: `Node`

#### Build & Deploy:
- **Build Command**: `npm install && npm run build && npx prisma generate`
- **Start Command**: `npm run start:prod`

### 1.4 Configurar Base de Datos
1. En el dashboard de Render, haz clic en **"New +"**
2. Selecciona **"PostgreSQL"**
3. Configuración:
   - **Name**: `nextcar-db`
   - **Database**: `nextcar`
   - **User**: `nextcar`
   - **Plan**: `Free`
4. Haz clic en **"Create Database"**

### 1.5 Configurar Variables de Entorno
En tu Web Service, ve a **"Environment"** y agrega:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-super-secreto-jwt-para-produccion-aqui
CLOUDINARY_CLOUD_NAME=db9a69863a0d2cae74872d83c7e1290
CLOUDINARY_API_KEY=386358672944649
CLOUDINARY_API_SECRET=iTeTCNz0AP-qu9u3ARAmHD0R1C0
DATABASE_URL=[Se conecta automáticamente a tu PostgreSQL]
```

### 1.6 Conectar Base de Datos
1. En la configuración de tu Web Service
2. Ve a **"Environment"**
3. En **DATABASE_URL**, selecciona **"Connect Database"**
4. Selecciona la base de datos `nextcar-db` que creaste

## ✅ PASO 2: Deploy

### 2.1 Actualizar schema para PostgreSQL
Antes del deploy, cambia tu `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Cambiar de "sqlite" a "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2.2 Push cambios a GitHub
```bash
git add .
git commit -m "Configure for PostgreSQL production"
git push origin master
```

### 2.3 Deploy automático
- Render detectará los cambios y empezará el deploy automáticamente
- El proceso tomará unos 5-10 minutos
- Verás los logs en tiempo real

## ✅ PASO 3: Verificación

### 3.1 URLs de tu aplicación
Una vez desplegado, tendrás:
- **API Base**: `https://nextcar-dashboard-api.onrender.com`
- **Swagger Docs**: `https://nextcar-dashboard-api.onrender.com/api`
- **API Pública**: `https://nextcar-dashboard-api.onrender.com/public`

### 3.2 Probar endpoints
```bash
# Obtener vehículos
curl https://nextcar-dashboard-api.onrender.com/public/vehicles

# Ver documentación
# Abrir en navegador: https://nextcar-dashboard-api.onrender.com/api
```

## 🔧 PASO 4: Configuración Adicional

### 4.1 Dominio personalizado (Opcional)
1. En tu Web Service, ve a **"Settings"**
2. En **"Custom Domains"**, agrega tu dominio
3. Configura los DNS en tu proveedor de dominio

### 4.2 CORS para frontend
Si tienes frontend, agrega en las variables de entorno:
```
ALLOWED_ORIGINS=https://tu-frontend.com,https://www.tu-frontend.com
```

## 🎯 URLs Importantes
- **Render Dashboard**: https://dashboard.render.com
- **Tu API**: https://nextcar-dashboard-api.onrender.com
- **Documentación**: https://nextcar-dashboard-api.onrender.com/api
- **Logs**: En tu dashboard de Render > Web Service > Logs

## 🚨 Troubleshooting

### Error de migración:
```bash
# Si falla la migración, ve a tu base de datos en Render y ejecuta:
npx prisma migrate reset --force
npx prisma migrate deploy
```

### Error de variables de entorno:
- Verifica que todas las variables estén configuradas
- Especialmente DATABASE_URL, JWT_SECRET y Cloudinary

### Build fallido:
- Revisa los logs en Render
- Asegúrate de que package.json tenga todas las dependencias

## 💡 Tips importantes:
1. **Plan Free**: 750 horas/mes gratis
2. **Sleep mode**: Se duerme después de 15 min de inactividad
3. **Base de datos**: 1GB gratis en PostgreSQL
4. **Builds**: Ilimitados en plan gratuito
