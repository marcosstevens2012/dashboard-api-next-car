# 🔐 **NEXTCAR Dashboard API - Seguridad y Endpoints**

## 📋 **Arquitectura de Seguridad Implementada**

### **🌐 Rutas Públicas (Página Web)**

- **Prefix**: `/public`
- **Autenticación**: ❌ No requerida
- **Rate Limiting**: ✅ Configurado por endpoint
- **Uso**: Consumo desde la página web pública

### **🔒 Rutas Privadas (Dashboard Admin)**

- **Prefix**: `/dashboard`
- **Autenticación**: ✅ JWT Token requerido
- **Rate Limiting**: ✅ Configuración global
- **Uso**: Solo para administradores del dashboard

---

## 🔑 **Autenticación**

### **Login de Administrador**

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "dashboard123"
}
```

**Respuesta:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin_1",
    "username": "admin",
    "role": "admin"
  }
}
```

### **Uso del Token**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🌐 **ENDPOINTS PÚBLICOS (Página Web)**

### **🚗 Vehículos Públicos**

#### **1. Listado con Filtros y Paginación**

```http
GET /public/vehicles?page=1&limit=12&marca=Toyota&precioMax=30000000
```

- **Rate Limit**: 100 requests/minuto
- **Filtros**: search, marca, combustible, transmision, traccion, anioMin, anioMax, precioMin, precioMax, destacado
- **Paginación**: page, limit, sortBy, sortOrder

#### **2. Vehículos Destacados**

```http
GET /public/vehicles/featured?limit=6
```

- **Rate Limit**: 50 requests/minuto
- **Uso**: Homepage, carrusel de destacados

#### **3. Detalle de Vehículo**

```http
GET /public/vehicles/{id}
```

- **Rate Limit**: 50 requests/minuto
- **Respuesta**: Vehículo completo con todas las imágenes

#### **4. Opciones de Filtros**

```http
GET /public/vehicles/filter-options
```

- **Rate Limit**: 20 requests/minuto
- **Respuesta**: Marcas, combustibles, transmisiones, etc. disponibles

### **📧 Contactos Públicos**

#### **5. Crear Contacto**

```http
POST /public/contacts
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "ciudad": "Buenos Aires",
  "provincia": "CABA",
  "telefono": "+54 11 1234-5678",
  "email": "juan@email.com",
  "mensaje": "Consulta sobre Jeep Grand Cherokee"
}
```

- **Rate Limit**: 5 requests/5 minutos (prevenir spam)

---

## 🔒 **ENDPOINTS PRIVADOS (Dashboard Admin)**

_Requieren JWT Token en header `Authorization: Bearer {token}`_

### **📊 Dashboard**

#### **6. Estadísticas del Dashboard**

```http
GET /dashboard/stats
Authorization: Bearer {token}
```

### **🚗 Gestión de Vehículos (Admin)**

#### **7. Listado Completo (Sin filtros)**

```http
GET /dashboard/vehicles
Authorization: Bearer {token}
```

#### **8. Crear Vehículo**

```http
POST /dashboard/vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Toyota Corolla",
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2023,
  "precio": 25000000,
  "descripcion": "Sedan automático",
  "destacado": false,
  // ... todos los campos opcionales
}
```

#### **9. Actualizar Vehículo**

```http
PATCH /dashboard/vehicles/{id}
Authorization: Bearer {token}
```

#### **10. Eliminar Vehículo**

```http
DELETE /dashboard/vehicles/{id}
Authorization: Bearer {token}
```

#### **11. Destacar/Quitar Destaque**

```http
PATCH /dashboard/vehicles/{id}/highlight
Authorization: Bearer {token}

{
  "destacado": true
}
```

### **📷 Gestión de Imágenes (Admin)**

#### **12. Subir Imágenes**

```http
POST /dashboard/vehicles/{id}/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- images: [archivo1.jpg, archivo2.jpg, ...]
```

#### **13. Listar Todas las Imágenes**

```http
GET /dashboard/images
Authorization: Bearer {token}
```

#### **14. Eliminar Imagen**

```http
DELETE /dashboard/images/{id}
Authorization: Bearer {token}
```

### **📧 Gestión de Contactos (Admin)**

#### **15. Listar Contactos**

```http
GET /dashboard/contacts
Authorization: Bearer {token}
```

#### **16. Ver Contacto**

```http
GET /dashboard/contacts/{id}
Authorization: Bearer {token}
```

#### **17. Eliminar Contacto**

```http
DELETE /dashboard/contacts/{id}
Authorization: Bearer {token}
```

---

## 🛡️ **Medidas de Seguridad Implementadas**

### **🔒 Autenticación y Autorización**

- ✅ JWT con expiración de 24 horas
- ✅ Contraseña hasheada con bcrypt
- ✅ Guards protegiendo rutas del dashboard
- ✅ Validación de tokens en cada request

### **🚦 Rate Limiting**

- ✅ 3 requests/segundo (global)
- ✅ 20 requests/10 segundos (global)
- ✅ 100 requests/minuto (global)
- ✅ Límites específicos por endpoint público
- ✅ 5 contactos máximo cada 5 minutos

### **🔐 Seguridad de Headers**

- ✅ Helmet.js configurado
- ✅ CORS restrictivo en producción
- ✅ Headers de seguridad HTTP

### **📝 Validación de Datos**

- ✅ DTOs con class-validator
- ✅ Whitelist de propiedades
- ✅ Transformación automática de tipos
- ✅ Mensajes de error ocultos en producción

### **📁 Archivos**

- ✅ Validación de tipos de imagen
- ✅ Límite de tamaño (5MB)
- ✅ Nombres únicos para evitar colisiones
- ✅ Máximo 10 imágenes por upload

---

## 🌍 **URLs de Ejemplo**

### **Desarrollo**

- **API Pública**: `http://localhost:3000/public`
- **Dashboard**: `http://localhost:3000/dashboard`
- **Auth**: `http://localhost:3000/auth/login`
- **Swagger**: `http://localhost:3000/api`

### **Producción** (configurar en .env)

- **API Pública**: `https://api.tu-dominio.com/public`
- **Dashboard**: `https://api.tu-dominio.com/dashboard`
- **Imágenes**: `https://api.tu-dominio.com/uploads/`

---

## 🔧 **Variables de Entorno**

```env
# .env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS="https://tu-dominio.com,https://www.tu-dominio.com"
```

---

## 🚀 **Comandos de Inicio**

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Con migraciones
npm run db:migrate
npm run db:seed
npm start
```

---

## ⚠️ **Consideraciones de Seguridad para Producción**

1. **🔑 Cambiar credenciales por defecto**
   - Usuario: `admin`
   - Contraseña: `dashboard123`

2. **🔐 JWT Secret seguro**
   - Generar secret aleatorio fuerte
   - Nunca commitear en el código

3. **🌐 CORS restrictivo**
   - Solo dominios permitidos
   - Nunca `origin: true` en producción

4. **📊 Monitoreo**
   - Logs de intentos de login
   - Alertas de rate limiting
   - Monitoreo de errores 401/403

5. **🗄️ Base de datos**
   - Migrar de SQLite a PostgreSQL
   - Backup automático
   - Encriptación en reposo

6. **☁️ Imágenes**
   - Migrar a CDN (Cloudinary/AWS S3)
   - Optimización automática
   - Respaldo de archivos
