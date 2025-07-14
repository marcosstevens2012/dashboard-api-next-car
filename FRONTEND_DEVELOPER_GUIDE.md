# 🎨 Guía Completa para Desarrolladores Frontend - NEXTCAR Dashboard API

## 📋 Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Tipos TypeScript](#tipos-typescript)
3. [Hooks de React](#hooks-de-react)
4. [Componentes de Ejemplo](#componentes-de-ejemplo)
5. [Estados de Carga y Error](#estados-de-carga-y-error)
6. [Paginación](#paginación)
7. [Filtros Dinámicos](#filtros-dinámicos)
8. [Upload de Imágenes](#upload-de-imágenes)
9. [Autenticación](#autenticación)
10. [SEO y Meta Tags](#seo-y-meta-tags)

---

## 🔧 Configuración Inicial

### Instalación de Dependencias

```bash
# React + TypeScript
npm install axios react-query @tanstack/react-query
npm install @types/react @types/react-dom

# Para formularios
npm install react-hook-form @hookform/resolvers yup

# Para UI (opcional)
npm install @tailwindcss/forms lucide-react

# Para routing
npm install react-router-dom @types/react-router-dom
```

### Configuración de Axios

```typescript
// src/lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Cliente para endpoints públicos
export const publicAPI = axios.create({
  baseURL: `${API_BASE_URL}/public`,
  timeout: 10000,
});

// Cliente para endpoints privados
export const privateAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Cliente para upload de archivos
export const uploadAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Interceptor para agregar token automáticamente
privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

uploadAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
const handleAuthError = (error: any) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

privateAPI.interceptors.response.use((response) => response, handleAuthError);
uploadAPI.interceptors.response.use((response) => response, handleAuthError);
```

---

## 📊 Tipos TypeScript Completos

```typescript
// src/types/api.ts

export interface Vehicle {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string;
  destacado: boolean;
  kilometraje?: string;
  observaciones?: string;

  // Motor
  combustible?: string;
  cilindrada?: string;
  potencia?: string;
  alimentacion?: string;
  cilindros?: number;
  valvulas?: number;

  // Transmisión
  traccion?: string;
  transmision?: string;
  velocidades?: string;
  neumaticos?: string;
  frenosDelanteros?: string;
  frenosTraseros?: string;
  direccionAsistida?: boolean;
  direccionAsistidaTipo?: string;

  // Confort
  aireAcondicionado?: boolean;
  asientoDelanteroAjuste?: boolean;
  volanteRegulable?: boolean;
  asientosTraseros?: string;
  tapizados?: string;
  cierrePuertas?: string;
  vidriosDelanteros?: string;
  vidriosTraseros?: string;
  espejosExteriores?: string;
  farosAntiniebla?: boolean;
  computadoraBordo?: boolean;
  llantasAleacion?: boolean;
  camaraEstacionamiento?: boolean;
  asistenciaArranquePendientes?: boolean;
  controlEconomiaCombustible?: boolean;
  luzDiurna?: boolean;

  // Seguridad
  abs?: boolean;
  distribucionElectronicaFrenado?: boolean;
  asistenciaFrenadaEmergencia?: boolean;
  airbagsDelanteros?: boolean;
  airbagsCortina?: string;
  airbagRodillaConductor?: boolean;
  airbagsLaterales?: string;
  controlEstabilidad?: boolean;
  controlTraccion?: boolean;
  alarma?: boolean;
  inmovilizador?: boolean;
  sensorPresion?: boolean;
  avisoCambioCarril?: boolean;
  detectPuntosCiegos?: boolean;
  asistEstacionamiento?: boolean;

  // Entretenimiento
  equipoMusica?: string;
  comandosVolante?: boolean;
  conexionUSB?: boolean;
  conexionAuxiliar?: boolean;
  bluetooth?: boolean;
  pantalla?: string;
  gps?: boolean;
  appleCarplay?: boolean;
  mirrorLink?: boolean;
  sistemaNavegacion?: boolean;
  reconocimientoVoz?: boolean;
  cargadorInalambrico?: boolean;

  // Relaciones
  images: VehicleImage[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface VehicleImage {
  id: string;
  url: string;
  vehicleId: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  vehiculoInteres?: string;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface VehicleFilters {
  search?: string;
  marca?: string;
  combustible?: string;
  transmision?: string;
  traccion?: string;
  anioMin?: number;
  anioMax?: number;
  precioMin?: number;
  precioMax?: number;
  destacado?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'nombre' | 'marca' | 'precio' | 'anio' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOptions {
  marcas: string[];
  combustibles: string[];
  transmisiones: string[];
  tracciones: string[];
  anios: {
    min: number;
    max: number;
  };
  precios: {
    min: number;
    max: number;
  };
}

export interface DashboardStats {
  total: number;
  destacados: number;
  porMarca: Record<string, number>;
  porCombustible: Record<string, number>;
  porTransmision: Record<string, number>;
  precioPromedio: number;
  anioPromedio: number;
}

export interface User {
  id: string;
  username: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateVehicleData {
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string;
  destacado?: boolean;
  [key: string]: any; // Para campos opcionales adicionales
}

export interface CreateContactData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  vehiculoInteres?: string;
}
```

---

## 🪝 Hooks de React

### Hook para Vehículos

```typescript
// src/hooks/useVehicles.ts
import { useState, useEffect } from 'react';
import { publicAPI } from '../lib/api';
import type {
  Vehicle,
  PaginatedResponse,
  VehicleFilters,
  PaginationMeta,
} from '../types/api';

export const useVehicles = (initialFilters: VehicleFilters = {}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<VehicleFilters>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...initialFilters,
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await publicAPI.get<PaginatedResponse<Vehicle>>(
        '/vehicles',
        {
          params: filters,
        },
      );

      setVehicles(response.data.data);
      setMeta(response.data.meta);
    } catch (err: any) {
      setError(err.message || 'Error al cargar vehículos');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<VehicleFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1, // Reset page unless explicitly set
    }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const loadMore = () => {
    if (meta?.hasNextPage) {
      updateFilters({ page: (filters.page || 1) + 1 });
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  return {
    vehicles,
    meta,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    loadMore,
    refetch: fetchVehicles,
  };
};
```

### Hook para Vehículo Individual

```typescript
// src/hooks/useVehicle.ts
import { useState, useEffect } from 'react';
import { publicAPI } from '../lib/api';
import type { Vehicle } from '../types/api';

export const useVehicle = (id: string) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await publicAPI.get<Vehicle>(`/vehicles/${id}`);
        setVehicle(response.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError('Vehículo no encontrado');
        } else {
          setError('Error al cargar el vehículo');
        }
        console.error('Error fetching vehicle:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  return { vehicle, loading, error };
};
```

### Hook para Contactos

```typescript
// src/hooks/useContact.ts
import { useState } from 'react';
import { publicAPI } from '../lib/api';
import type { CreateContactData, Contact } from '../types/api';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createContact = async (
    data: CreateContactData,
  ): Promise<Contact | null> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await publicAPI.post<Contact>('/contacts', data);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError(
          'Has enviado muchas consultas. Intenta de nuevo en unos minutos.',
        );
      } else {
        setError('Error al enviar la consulta. Intenta de nuevo.');
      }
      console.error('Error creating contact:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { createContact, loading, error, success, reset };
};
```

---

## 🧩 Componentes de Ejemplo

### Componente de Tarjeta de Vehículo

```typescript
// src/components/VehicleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Fuel, Settings } from 'lucide-react';
import type { Vehicle } from '../types/api';

interface VehicleCardProps {
  vehicle: Vehicle;
  showFeaturedBadge?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  showFeaturedBadge = true
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = vehicle.images[0]?.url || '/placeholder-car.jpg';

  return (
    <div className="vehicle-card">
      {showFeaturedBadge && vehicle.destacado && (
        <div className="featured-badge">
          <Star className="w-4 h-4" />
          Destacado
        </div>
      )}

      <Link to={`/vehiculos/${vehicle.id}`} className="vehicle-link">
        <div className="vehicle-image">
          <img
            src={mainImage}
            alt={vehicle.nombre}
            loading="lazy"
            className="w-full h-48 object-cover"
          />
          {vehicle.images.length > 1 && (
            <div className="image-count">
              +{vehicle.images.length - 1} fotos
            </div>
          )}
        </div>

        <div className="vehicle-info">
          <h3 className="vehicle-title">{vehicle.nombre}</h3>
          <p className="vehicle-subtitle">
            {vehicle.marca} {vehicle.modelo}
          </p>

          <div className="vehicle-specs">
            <div className="spec-item">
              <Calendar className="w-4 h-4" />
              <span>{vehicle.anio}</span>
            </div>
            {vehicle.combustible && (
              <div className="spec-item">
                <Fuel className="w-4 h-4" />
                <span>{vehicle.combustible}</span>
              </div>
            )}
            {vehicle.transmision && (
              <div className="spec-item">
                <Settings className="w-4 h-4" />
                <span>{vehicle.transmision}</span>
              </div>
            )}
          </div>

          {vehicle.kilometraje && (
            <p className="vehicle-mileage">{vehicle.kilometraje}</p>
          )}

          <div className="vehicle-price">
            {formatPrice(vehicle.precio)}
          </div>

          <p className="vehicle-description">
            {vehicle.descripcion.length > 100
              ? `${vehicle.descripcion.substring(0, 100)}...`
              : vehicle.descripcion}
          </p>
        </div>
      </Link>
    </div>
  );
};
```

### Componente de Lista de Vehículos

```typescript
// src/components/VehicleList.tsx
import React from 'react';
import { useVehicles } from '../hooks/useVehicles';
import { VehicleCard } from './VehicleCard';
import { VehicleFilters } from './VehicleFilters';
import { Pagination } from './Pagination';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

export const VehicleList: React.FC = () => {
  const { vehicles, meta, loading, error, filters, updateFilters, clearFilters } = useVehicles();

  if (loading && vehicles.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && vehicles.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="vehicle-list">
      <div className="filters-section">
        <VehicleFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
        />
      </div>

      {vehicles.length === 0 ? (
        <div className="no-results">
          <h3>No se encontraron vehículos</h3>
          <p>Intenta modificar los filtros de búsqueda.</p>
          <button onClick={clearFilters} className="btn-primary">
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <>
          <div className="results-header">
            <p>
              Mostrando {vehicles.length} de {meta?.total || 0} vehículos
              {filters.search && ` para "${filters.search}"`}
            </p>
          </div>

          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={(page) => updateFilters({ page })}
              hasNextPage={meta.hasNextPage}
              hasPrevPage={meta.hasPrevPage}
            />
          )}
        </>
      )}

      {loading && vehicles.length > 0 && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
```

### Componente de Formulario de Contacto

```typescript
// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { useContact } from '../hooks/useContact';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { CreateContactData } from '../types/api';

interface ContactFormProps {
  vehicleName?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  vehicleName,
  className = ''
}) => {
  const { createContact, loading, error, success, reset } = useContact();
  const [formData, setFormData] = useState<CreateContactData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    vehiculoInteres: vehicleName || '',
  });

  const [errors, setErrors] = useState<Partial<CreateContactData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateContactData> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await createContact(formData);
    if (result) {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        vehiculoInteres: vehicleName || '',
      });
      setErrors({});
    }
  };

  const handleChange = (field: keyof CreateContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (error || success) {
      reset();
    }
  };

  if (success) {
    return (
      <div className={`contact-form success-state ${className}`}>
        <div className="success-message">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h3>¡Consulta enviada exitosamente!</h3>
          <p>Te contactaremos a la brevedad.</p>
          <button
            onClick={() => { reset(); }}
            className="btn-secondary"
          >
            Enviar otra consulta
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`contact-form ${className}`}>
      <h3>Contactanos</h3>
      {vehicleName && (
        <p className="vehicle-interest">
          Consulta sobre: <strong>{vehicleName}</strong>
        </p>
      )}

      {error && (
        <div className="error-message">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="nombre">Nombre completo *</label>
          <input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className={errors.nombre ? 'error' : ''}
            disabled={loading}
          />
          {errors.nombre && <span className="field-error">{errors.nombre}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
            disabled={loading}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          value={formData.telefono}
          onChange={(e) => handleChange('telefono', e.target.value)}
          placeholder="+54 9 11 1234-5678"
          disabled={loading}
        />
      </div>

      <div className="form-field">
        <label htmlFor="vehiculoInteres">Vehículo de interés</label>
        <input
          type="text"
          id="vehiculoInteres"
          value={formData.vehiculoInteres}
          onChange={(e) => handleChange('vehiculoInteres', e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-field">
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          id="mensaje"
          rows={4}
          value={formData.mensaje}
          onChange={(e) => handleChange('mensaje', e.target.value)}
          className={errors.mensaje ? 'error' : ''}
          placeholder="Describe tu consulta..."
          disabled={loading}
        />
        {errors.mensaje && <span className="field-error">{errors.mensaje}</span>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Enviando...' : 'Enviar Consulta'}
      </button>
    </form>
  );
};
```

---

## 🎨 Estilos CSS Ejemplo

```css
/* src/styles/components.css */

/* Vehicle Card */
.vehicle-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative;
}

.featured-badge {
  @apply absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 z-10;
}

.vehicle-image {
  @apply relative;
}

.image-count {
  @apply absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs;
}

.vehicle-info {
  @apply p-4;
}

.vehicle-title {
  @apply text-lg font-semibold text-gray-900 mb-1;
}

.vehicle-subtitle {
  @apply text-gray-600 mb-2;
}

.vehicle-specs {
  @apply flex gap-4 mb-2 text-sm text-gray-500;
}

.spec-item {
  @apply flex items-center gap-1;
}

.vehicle-price {
  @apply text-xl font-bold text-blue-600 mb-2;
}

.vehicle-description {
  @apply text-gray-600 text-sm;
}

/* Contact Form */
.contact-form {
  @apply bg-white p-6 rounded-lg shadow-md;
}

.contact-form h3 {
  @apply text-xl font-semibold mb-4;
}

.vehicle-interest {
  @apply text-sm text-gray-600 mb-4;
}

.error-message {
  @apply flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded mb-4;
}

.success-state {
  @apply text-center;
}

.success-message {
  @apply flex flex-col items-center gap-4;
}

.form-row {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4 mb-4;
}

.form-field {
  @apply mb-4;
}

.form-field label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-field input,
.form-field textarea,
.form-field select {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.form-field input.error,
.form-field textarea.error {
  @apply border-red-500 focus:ring-red-500;
}

.field-error {
  @apply text-red-500 text-sm mt-1;
}

.btn-primary {
  @apply bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700;
}

/* Loading and Error states */
.loading-spinner {
  @apply flex justify-center items-center p-8;
}

.no-results {
  @apply text-center p-8;
}

.vehicle-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Responsive design */
@media (max-width: 768px) {
  .vehicle-grid {
    @apply grid-cols-1;
  }
}
```

Esta guía proporciona una base sólida para desarrolladores frontend que quieran integrar la API NEXTCAR en aplicaciones React modernas con TypeScript, incluyendo manejo de estados, componentes reutilizables y mejores prácticas de UX.
