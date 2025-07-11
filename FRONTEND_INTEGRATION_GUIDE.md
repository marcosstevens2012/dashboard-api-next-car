# 🔄 **NEXTCAR Frontend Integration Guide**

## 📋 **Resumen de Cambios de Seguridad Implementados**

### **🔐 Cambios Principales en la API**

1. **Rutas separadas por contexto:**
   - **Públicas**: `/public/*` - Sin autenticación, rate-limited
   - **Privadas**: `/dashboard/*` - JWT requerido, para admin

2. **Autenticación JWT:**
   - Login en `/auth/login`
   - Token válido por 24 horas
   - Headers: `Authorization: Bearer {token}`

3. **Base de datos para usuarios:**
   - Usuario admin almacenado en DB (no hardcodeado)
   - Contraseñas hasheadas con bcrypt

4. **Rate limiting por endpoint:**
   - Diferentes límites según el uso
   - Protección anti-spam en contactos

---

## 🛠️ **Implementación en Frontend**

### **1. Configuración de API Base**

```typescript
// config/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  PUBLIC_PREFIX: '/public',
  DASHBOARD_PREFIX: '/dashboard',
  AUTH_PREFIX: '/auth',
  IMAGES_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
};

export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: `${API_CONFIG.AUTH_PREFIX}/login`,

  // Públicos (Página Web)
  PUBLIC_VEHICLES: `${API_CONFIG.PUBLIC_PREFIX}/vehicles`,
  PUBLIC_FEATURED: `${API_CONFIG.PUBLIC_PREFIX}/vehicles/featured`,
  PUBLIC_VEHICLE_DETAIL: (id: string) =>
    `${API_CONFIG.PUBLIC_PREFIX}/vehicles/${id}`,
  PUBLIC_FILTER_OPTIONS: `${API_CONFIG.PUBLIC_PREFIX}/vehicles/filter-options`,
  PUBLIC_CONTACT: `${API_CONFIG.PUBLIC_PREFIX}/contacts`,

  // Dashboard (Admin)
  DASHBOARD_STATS: `${API_CONFIG.DASHBOARD_PREFIX}/stats`,
  DASHBOARD_VEHICLES: `${API_CONFIG.DASHBOARD_PREFIX}/vehicles`,
  DASHBOARD_VEHICLE_DETAIL: (id: string) =>
    `${API_CONFIG.DASHBOARD_PREFIX}/vehicles/${id}`,
  DASHBOARD_VEHICLE_HIGHLIGHT: (id: string) =>
    `${API_CONFIG.DASHBOARD_PREFIX}/vehicles/${id}/highlight`,
  DASHBOARD_VEHICLE_IMAGES: (id: string) =>
    `${API_CONFIG.DASHBOARD_PREFIX}/vehicles/${id}/images`,
  DASHBOARD_IMAGES: `${API_CONFIG.DASHBOARD_PREFIX}/images`,
  DASHBOARD_DELETE_IMAGE: (id: string) =>
    `${API_CONFIG.DASHBOARD_PREFIX}/images/${id}`,
  DASHBOARD_CONTACTS: `${API_CONFIG.DASHBOARD_PREFIX}/contacts`,
  DASHBOARD_CONTACT_DETAIL: (id: string) =>
    `${API_CONFIG.DASHBOARD_PREFIX}/contacts/${id}`,
};
```

### **2. Cliente HTTP con Interceptors**

```typescript
// services/httpClient.ts
import axios, { AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/config/api';

// Cliente para rutas públicas
export const publicApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

// Cliente para dashboard (rutas protegidas)
export const dashboardApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

// Interceptor para agregar token automáticamente
dashboardApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
dashboardApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  },
);
```

### **3. Store de Autenticación (Zustand/Context)**

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) throw new Error('Credenciales inválidas');

          const data = await response.json();

          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
          });

          localStorage.setItem('auth_token', data.access_token);
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      },

      checkAuth: () => {
        const state = get();
        return state.isAuthenticated && !!state.token;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
```

### **4. Servicios API**

```typescript
// services/publicApi.ts - Para la página web pública
export class PublicApiService {
  static async getVehicles(filters?: VehicleFilters, pagination?: Pagination) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    if (pagination) {
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
    }

    const response = await publicApi.get(
      `${API_ENDPOINTS.PUBLIC_VEHICLES}?${params}`,
    );
    return response.data;
  }

  static async getFeaturedVehicles(limit = 6) {
    const response = await publicApi.get(
      `${API_ENDPOINTS.PUBLIC_FEATURED}?limit=${limit}`,
    );
    return response.data;
  }

  static async getVehicleDetail(id: string) {
    const response = await publicApi.get(
      API_ENDPOINTS.PUBLIC_VEHICLE_DETAIL(id),
    );
    return response.data;
  }

  static async getFilterOptions() {
    const response = await publicApi.get(API_ENDPOINTS.PUBLIC_FILTER_OPTIONS);
    return response.data;
  }

  static async createContact(contactData: CreateContactDto) {
    const response = await publicApi.post(
      API_ENDPOINTS.PUBLIC_CONTACT,
      contactData,
    );
    return response.data;
  }
}

// services/dashboardApi.ts - Para el dashboard admin
export class DashboardApiService {
  static async getStats() {
    const response = await dashboardApi.get(API_ENDPOINTS.DASHBOARD_STATS);
    return response.data;
  }

  static async getVehicles() {
    const response = await dashboardApi.get(API_ENDPOINTS.DASHBOARD_VEHICLES);
    return response.data;
  }

  static async createVehicle(vehicleData: CreateVehicleDto) {
    const response = await dashboardApi.post(
      API_ENDPOINTS.DASHBOARD_VEHICLES,
      vehicleData,
    );
    return response.data;
  }

  static async updateVehicle(
    id: string,
    vehicleData: Partial<CreateVehicleDto>,
  ) {
    const response = await dashboardApi.patch(
      API_ENDPOINTS.DASHBOARD_VEHICLE_DETAIL(id),
      vehicleData,
    );
    return response.data;
  }

  static async deleteVehicle(id: string) {
    const response = await dashboardApi.delete(
      API_ENDPOINTS.DASHBOARD_VEHICLE_DETAIL(id),
    );
    return response.data;
  }

  static async toggleHighlight(id: string, destacado: boolean) {
    const response = await dashboardApi.patch(
      API_ENDPOINTS.DASHBOARD_VEHICLE_HIGHLIGHT(id),
      { destacado },
    );
    return response.data;
  }

  static async uploadImages(vehicleId: string, images: File[]) {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));

    const response = await dashboardApi.post(
      API_ENDPOINTS.DASHBOARD_VEHICLE_IMAGES(vehicleId),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data;
  }

  static async deleteImage(imageId: string) {
    const response = await dashboardApi.delete(
      API_ENDPOINTS.DASHBOARD_DELETE_IMAGE(imageId),
    );
    return response.data;
  }

  static async getContacts() {
    const response = await dashboardApi.get(API_ENDPOINTS.DASHBOARD_CONTACTS);
    return response.data;
  }

  static async deleteContact(id: string) {
    const response = await dashboardApi.delete(
      API_ENDPOINTS.DASHBOARD_CONTACT_DETAIL(id),
    );
    return response.data;
  }
}
```

### **5. Hook de Autenticación**

```typescript
// hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, checkAuth } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
};

export const useRequireAuth = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router, checkAuth]);

  return isAuthenticated;
};
```

### **6. Componente de Login**

```tsx
// components/admin/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="dashboard123"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
```

### **7. Middleware de Protección**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token && !request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 🎯 **Credenciales por Defecto**

**Para desarrollo y pruebas:**

- **Usuario**: `admin`
- **Contraseña**: `dashboard123`

⚠️ **IMPORTANTE**: Cambiar estas credenciales en producción

---

## 🌐 **Variables de Entorno**

```env
# .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_IMAGES_URL=http://localhost:3000

# Para producción
NEXT_PUBLIC_API_URL=https://api.tu-dominio.com
NEXT_PUBLIC_IMAGES_URL=https://api.tu-dominio.com
```

---

## 🔄 **Rate Limiting Handling**

```typescript
// utils/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response?.status === 429) {
    return 'Demasiadas solicitudes. Intenta de nuevo en unos momentos.';
  }

  if (error.response?.status === 401) {
    return 'Sesión expirada. Por favor, inicia sesión nuevamente.';
  }

  if (error.response?.status === 403) {
    return 'No tienes permisos para realizar esta acción.';
  }

  return error.response?.data?.message || 'Error inesperado';
};
```

---

## 🔐 **Checklist de Implementación**

- [ ] Configurar interceptors HTTP
- [ ] Implementar store de autenticación
- [ ] Crear servicios API separados (public/dashboard)
- [ ] Añadir middleware de protección
- [ ] Implementar manejo de errores
- [ ] Configurar variables de entorno
- [ ] Probar login/logout
- [ ] Verificar rate limiting
- [ ] Probar upload de imágenes
- [ ] Validar redirecciones de auth

---

## 🚀 **Próximos Pasos**

1. **Implementar cambios de seguridad**
2. **Probar todos los endpoints**
3. **Configurar manejo de errores**
4. **Optimizar UX con loading states**
5. **Añadir feedback visual para rate limits**
6. **Implementar refresh de token (opcional)**
