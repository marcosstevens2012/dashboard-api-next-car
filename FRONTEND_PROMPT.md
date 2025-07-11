# 🎯 **PROMPT PARA IMPLEMENTAR CAMBIOS DE SEGURIDAD EN FRONTEND**

## 📋 **Contexto**

Necesito implementar los cambios de seguridad de la API NEXTCAR en mi frontend Next.js. La API se ha actualizado con:

1. **Rutas separadas**: `/public/*` (sin auth) y `/dashboard/*` (con JWT)
2. **Autenticación JWT** con base de datos
3. **Rate limiting** por endpoint
4. **Medidas de seguridad adicionales**

## 🛠️ **Cambios a Implementar**

### **1. CONFIGURACIÓN DE API**

```typescript
// Actualizar configuración de endpoints
const API_ENDPOINTS = {
  // Autenticación
  LOGIN: '/auth/login',

  // Públicos (sin auth, rate-limited)
  PUBLIC_VEHICLES: '/public/vehicles',
  PUBLIC_FEATURED: '/public/vehicles/featured',
  PUBLIC_VEHICLE_DETAIL: (id) => `/public/vehicles/${id}`,
  PUBLIC_FILTER_OPTIONS: '/public/vehicles/filter-options',
  PUBLIC_CONTACT: '/public/contacts',

  // Dashboard (JWT requerido)
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_VEHICLES: '/dashboard/vehicles',
  DASHBOARD_VEHICLE_DETAIL: (id) => `/dashboard/vehicles/${id}`,
  DASHBOARD_VEHICLE_HIGHLIGHT: (id) => `/dashboard/vehicles/${id}/highlight`,
  DASHBOARD_VEHICLE_IMAGES: (id) => `/dashboard/vehicles/${id}/images`,
  DASHBOARD_IMAGES: '/dashboard/images',
  DASHBOARD_DELETE_IMAGE: (id) => `/dashboard/images/${id}`,
  DASHBOARD_CONTACTS: '/dashboard/contacts',
  DASHBOARD_CONTACT_DETAIL: (id) => `/dashboard/contacts/${id}`,
};
```

### **2. AUTENTICACIÓN JWT**

```typescript
// Login actualizado con respuesta de API
const loginResponse = {
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "clxxxxx",
    username: "admin",
    role: "admin"
  }
};

// Headers para rutas protegidas
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### **3. SERVICIOS API SEPARADOS**

```typescript
// Cliente para rutas públicas (página web)
const publicApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

// Cliente para dashboard (rutas protegidas)
const dashboardApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

// Interceptor automático para JWT
dashboardApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **4. MANEJO DE ERRORES DE AUTENTICACIÓN**

```typescript
// Interceptor para 401/403
dashboardApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - logout automático
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    if (error.response?.status === 429) {
      // Rate limit exceeded
      showError('Demasiadas solicitudes. Intenta en unos momentos.');
    }
    return Promise.reject(error);
  },
);
```

### **5. CREDENCIALES ACTUALIZADAS**

```
Usuario: admin
Contraseña: dashboard123
Token válido: 24 horas
```

## 🎯 **TAREAS ESPECÍFICAS**

### **Para la Página Web Pública**

- [ ] Actualizar llamadas a `/public/vehicles` para el listado
- [ ] Usar `/public/vehicles/featured` para destacados
- [ ] Actualizar formulario de contacto a `/public/contacts`
- [ ] Manejar rate limiting en UI (mostrar loading/error)

### **Para el Dashboard Admin**

- [ ] Implementar login con JWT en `/auth/login`
- [ ] Cambiar todas las rutas a `/dashboard/*`
- [ ] Añadir interceptor para incluir token automáticamente
- [ ] Implementar logout cuando token expire (401)
- [ ] Proteger rutas de admin con middleware
- [ ] Actualizar upload de imágenes con auth

### **Manejo de Estados**

- [ ] Loading states para todas las llamadas API
- [ ] Error handling para rate limiting (429)
- [ ] Feedback visual para autenticación fallida
- [ ] Redirección automática en logout

### **Seguridad**

- [ ] Almacenar token de forma segura
- [ ] Limpiar datos sensibles en logout
- [ ] Validar token antes de rutas protegidas
- [ ] Manejar expiración de sesión

## 🔧 **ARCHIVOS A ACTUALIZAR**

1. **API Configuration**: `config/api.ts` o `lib/api.ts`
2. **HTTP Client**: `services/httpClient.ts`
3. **Auth Store/Context**: `stores/authStore.ts` o `contexts/AuthContext.tsx`
4. **Login Component**: `components/admin/LoginForm.tsx`
5. **Dashboard Services**: `services/dashboardApi.ts`
6. **Public Services**: `services/publicApi.ts`
7. **Middleware**: `middleware.ts` (Next.js)
8. **Error Handling**: `utils/errorHandler.ts`

## 🚨 **PUNTOS CRÍTICOS**

1. **Separar completamente** las llamadas públicas de las privadas
2. **JWT debe incluirse** en TODAS las rutas `/dashboard/*`
3. **Rate limiting**: Manejar respuestas 429 con UX apropiada
4. **Logout automático** en errores 401
5. **Validar autenticación** antes de acceder a rutas admin

## 🧪 **TESTING**

```bash
# Probar endpoints públicos (sin auth)
curl http://localhost:3000/public/vehicles
curl http://localhost:3000/public/vehicles/featured

# Probar login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"dashboard123"}'

# Probar endpoints protegidos (con token)
curl http://localhost:3000/dashboard/vehicles \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 **VARIABLES DE ENTORNO**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_IMAGES_URL=http://localhost:3000
```

## ⚡ **QUICK START**

1. Actualizar configuración de endpoints
2. Implementar interceptors HTTP
3. Crear store de autenticación
4. Actualizar componente de login
5. Proteger rutas de admin
6. Probar flujo completo login → dashboard → logout

---

**IMPORTANTE**: Todas las rutas del dashboard ahora requieren JWT. Las rutas públicas de la web no requieren autenticación pero tienen rate limiting.
