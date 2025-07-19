# 🚀 Deploy a Render - NEXTCAR Dashboard API

## Pasos para Deploy desde Cero

### 1. Preparar el Repositorio

```bash
# Asegurar que todos los cambios estén commiteados
git add .
git commit -m "feat: configuración para deploy en Render"
git push origin master
```

### 2. Configurar en Render.com

1. **Crear cuenta en Render.com** (si no tienes una)
2. **Conectar GitHub**: Ve a Dashboard > Connect a repository
3. **Seleccionar repositorio**: `marcosstevens2012/dashboard-api`

### 3. Configuración del Servicio Web

**Configuración Básica:**

- **Name**: `nextcar-dashboard-api`
- **Region**: Oregon (US West)
- **Branch**: `master`
- **Runtime**: Node
- **Build Command**:
  ```bash
  npm ci && npm run build && npx prisma generate
  ```
- **Start Command**:
  ```bash
  npx prisma migrate deploy && npm run start:prod
  ```

**Variables de Entorno Requeridas:**

- `NODE_ENV`: `production`
- `JWT_SECRET`: [Generar automáticamente en Render]
- `PORT`: `10000`
- `CLOUDINARY_CLOUD_NAME`: [Tu cloud name de Cloudinary]
- `CLOUDINARY_API_KEY`: [Tu API key de Cloudinary]
- `CLOUDINARY_API_SECRET`: [Tu API secret de Cloudinary]
- `DATABASE_URL`: [Se configura automáticamente con la base de datos]

### 4. Configurar Base de Datos PostgreSQL

1. **En Render Dashboard** > Create > PostgreSQL
2. **Configuración**:
   - **Name**: `nextcar-db`
   - **Database Name**: `nextcar`
   - **User**: `nextcar`
   - **Region**: Oregon (mismo que el web service)
3. **Conectar al Web Service**: En la configuración del web service, agregar la variable de entorno `DATABASE_URL` desde la base de datos creada.

### 5. Verificar Deploy

Una vez desplegado, verificar:

- ✅ **Health Check**: `https://nextcar-dashboard-api.onrender.com/health`
- ✅ **API Docs**: `https://nextcar-dashboard-api.onrender.com/api`
- ✅ **Public API**: `https://nextcar-dashboard-api.onrender.com/public/vehicles`

### 6. Configurar Cloudinary (Opcional)

Si planeas usar upload de imágenes:

1. Crear cuenta en [Cloudinary](https://cloudinary.com)
2. Obtener credenciales del Dashboard
3. Agregar las variables de entorno en Render

## 🔧 Troubleshooting

### Error en Build

- Verificar que `package.json` tenga todos los scripts necesarios
- Asegurar que `prisma` está en dependencies, no en devDependencies

### Error en Start

- Verificar que `DATABASE_URL` esté configurada
- Revisar logs en Render Dashboard

### Error 502/503

- Verificar que la aplicación escuche en el puerto correcto (`process.env.PORT`)
- Verificar que el health check responda en `/` o `/health`

## 📋 Checklist Pre-Deploy

- [ ] Código commiteado y pusheado
- [ ] Variables de entorno configuradas
- [ ] Base de datos PostgreSQL creada
- [ ] Cloudinary configurado (si se necesita)
- [ ] Health check funcionando
- [ ] CORS configurado para el dominio de Render

## 🌐 URLs Importantes

- **API Producción**: `https://nextcar-dashboard-api.onrender.com`
- **Swagger Docs**: `https://nextcar-dashboard-api.onrender.com/api`
- **Health Check**: `https://nextcar-dashboard-api.onrender.com/health`
- **Dashboard**: `https://nextcar-dashboard-api.onrender.com/dashboard` (requiere JWT)

## 🔐 Autenticación

Para acceder a endpoints protegidos:

1. POST a `/auth/login` con credenciales
2. Usar el JWT token en header: `Authorization: Bearer <token>`
