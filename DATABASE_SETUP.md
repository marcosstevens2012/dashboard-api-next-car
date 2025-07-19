# 🗄️ Configuración de Base de Datos en Render

## Problema Identificado

El error muestra que está intentando conectarse a una base de datos de **Supabase** en lugar de **Render PostgreSQL**:

```
Can't reach database server at `db.lmjicsbdyvmnxnfnshgi.supabase.co:5432`
```

## ✅ Solución: Configurar Base de Datos PostgreSQL en Render

### Paso 1: Crear Base de Datos PostgreSQL

1. **En Render Dashboard** → **Create** → **PostgreSQL**
2. **Configuración:**
   ```
   Name: nextcar-db
   Database Name: nextcar
   User: nextcar
   Region: Oregon (mismo que el web service)
   Plan: Free
   ```

### Paso 2: Conectar al Web Service

1. **Ve a tu Web Service** en Render Dashboard
2. **Environment** → **Add Environment Variable**
3. **Agregar DATABASE_URL:**
   ```
   Key: DATABASE_URL
   Value: [Seleccionar] From Database → nextcar-db → Connection String
   ```

### Paso 3: Verificar Variables de Entorno

Asegúrate de que estas variables estén configuradas:

```env
NODE_ENV=production
DATABASE_URL=[From Database: nextcar-db]
JWT_SECRET=[Auto-generated]
PORT=10000
```

### Paso 4: Variables Opcionales (Cloudinary)

Si usas upload de imágenes:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## 🔍 Debugging Agregado

Con los cambios recientes, el deploy mostrará:

1. **DATABASE_URL Status**: Si está configurada o no
2. **Database Connection Info**: Host y nombre de BD
3. **Ping Test**: Verificación de conectividad antes de migrar
4. **Detailed Error Logs**: Información específica de errores

## 🚨 Troubleshooting

### Error: "Can't reach database server"

**Posibles causas:**

1. ❌ Base de datos no creada en Render
2. ❌ DATABASE_URL apunta a Supabase/otra BD
3. ❌ Variable no configurada en Environment

**Solución:**

1. ✅ Crear base PostgreSQL en Render
2. ✅ Configurar DATABASE_URL desde Render DB
3. ✅ Verificar que ambos servicios estén en la misma región

### Error: "Connection refused"

**Causas:**

- Base de datos aún iniciando
- Red de Render con problemas

**Solución:**

- Esperar 2-3 minutos
- Reintentar deploy

### Error: "Authentication failed"

**Causas:**

- Credenciales incorrectas en DATABASE_URL

**Solución:**

- Regenerar DATABASE_URL desde Render Dashboard
- Verificar que user/password coincidan

## ✅ Checklist Pre-Deploy

- [ ] Base de datos PostgreSQL creada en Render
- [ ] DATABASE_URL configurada desde la base de Render
- [ ] Ambos servicios en la misma región (Oregon)
- [ ] Variables de entorno verificadas
- [ ] No hay variables locales interferentes

## 🔗 Referencias

- [Render PostgreSQL Docs](https://render.com/docs/databases)
- [Prisma Connection Troubleshooting](https://www.prisma.io/docs/reference/database-reference/connection-urls)

## 📋 Siguiente Deploy

Los logs del próximo deploy mostrarán:

```bash
DATABASE_URL=postgresql://nextcar:***@***-postgres:5432/nextcar
🔄 Connecting to database...
📍 DATABASE_URL: SET
🗄️ Database Host: [render-host]:5432
🗄️ Database Name: nextcar
✅ Database connected successfully
```

Si sigue fallando, los logs darán información específica del problema.
