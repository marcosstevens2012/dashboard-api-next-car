# 🚀 Ejemplos Completos de Uso - NEXTCAR Dashboard API

## 🔧 Configuración Base

### Cliente HTTP con Axios

```typescript
// api.config.ts
export const API_BASE_URL = 'http://localhost:3001';

import axios from 'axios';

// Cliente para endpoints públicos
export const publicAPI = axios.create({
  baseURL: `${API_BASE_URL}/public`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente para endpoints privados
export const privateAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente para upload de archivos
export const apiFormData = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Interceptor para agregar JWT token automáticamente
privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
privateAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
```

## 🌐 Ejemplos de Endpoints Públicos

### 1. Obtener Vehículos con Filtros Avanzados

```typescript
// Función para obtener vehículos con filtros
interface VehicleFilters {
  page?: number;
  limit?: number;
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
  sortBy?: 'nombre' | 'marca' | 'precio' | 'anio' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const getVehicles = async (filters: VehicleFilters = {}) => {
  try {
    const response = await publicAPI.get('/vehicles', {
      params: {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    throw error;
  }
};

// Ejemplo de uso: Buscar Toyota con precio entre $20,000 y $30,000
const toyotaVehicles = await getVehicles({
  search: 'toyota',
  marca: 'Toyota',
  precioMin: 20000,
  precioMax: 30000,
  anioMin: 2020,
  page: 1,
  limit: 5,
  sortBy: 'precio',
  sortOrder: 'asc'
});

// Respuesta esperada:
{
  "data": [
    {
      "id": "clz123abc456",
      "nombre": "Toyota Corolla XEI",
      "marca": "Toyota",
      "modelo": "Corolla",
      "anio": 2023,
      "precio": 25000,
      "descripcion": "Sedán compacto con excelente rendimiento en combustible",
      "destacado": true,
      "kilometraje": "15.000 km",
      "combustible": "Nafta",
      "cilindrada": "1.8L",
      "potencia": "140 HP",
      "transmision": "Automática",
      "traccion": "4x2",
      "aireAcondicionado": true,
      "abs": true,
      "bluetooth": true,
      "gps": false,
      "images": [
        {
          "id": "img123",
          "url": "/uploads/vehicle-1234567890.jpg"
        }
      ],
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 15,
    "page": 1,
    "limit": 5,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2. Obtener Vehículos Destacados

```typescript
export const getFeaturedVehicles = async (page = 1, limit = 6) => {
  try {
    const response = await publicAPI.get('/vehicles/featured', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener vehículos destacados:', error);
    throw error;
  }
};

// Uso en componente React para página principal
const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedVehicles(1, 6)
      .then(data => {
        setVehicles(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando vehículos destacados...</div>;

  return (
    <div className="featured-vehicles">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
```

### 3. Obtener Opciones para Filtros Dinámicos

```typescript
export const getFilterOptions = async () => {
  try {
    const response = await publicAPI.get('/vehicles/filter-options');
    return response.data;
  } catch (error) {
    console.error('Error al obtener opciones de filtros:', error);
    throw error;
  }
};

// Respuesta esperada:
{
  "marcas": ["Toyota", "Ford", "Chevrolet", "Volkswagen", "Honda"],
  "combustibles": ["Nafta", "Diesel", "Híbrido", "Eléctrico"],
  "transmisiones": ["Manual", "Automática", "CVT"],
  "tracciones": ["4x2", "4x4", "AWD"],
  "anios": {
    "min": 2015,
    "max": 2024
  },
  "precios": {
    "min": 8000,
    "max": 80000
  }
}

// Uso en componente de filtros
const VehicleFilters = ({ onFiltersChange }) => {
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    getFilterOptions().then(setFilterOptions);
  }, []);

  if (!filterOptions) return <div>Cargando filtros...</div>;

  return (
    <div className="filters">
      <select onChange={(e) => onFiltersChange({ marca: e.target.value })}>
        <option value="">Todas las marcas</option>
        {filterOptions.marcas.map(marca => (
          <option key={marca} value={marca}>{marca}</option>
        ))}
      </select>
      {/* Más filtros... */}
    </div>
  );
};
```

### 4. Obtener Detalles Completos de un Vehículo

```typescript
export const getVehicleById = async (id: string) => {
  try {
    const response = await publicAPI.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Vehículo no encontrado');
    }
    throw error;
  }
};

// Respuesta con TODOS los campos disponibles:
{
  "id": "clz123abc456",
  "nombre": "Toyota Camry Hybrid Premium",
  "marca": "Toyota",
  "modelo": "Camry",
  "anio": 2023,
  "precio": 35000,
  "descripcion": "Sedán híbrido premium con tecnología de última generación",
  "destacado": true,
  "kilometraje": "0 km",
  "observaciones": "Vehículo 0 km con garantía de fábrica",

  // Especificaciones del motor
  "combustible": "Híbrido",
  "cilindrada": "2.5L + Motor eléctrico",
  "potencia": "218 HP combinados",
  "alimentacion": "Inyección directa + Motor eléctrico",
  "cilindros": 4,
  "valvulas": 16,

  // Transmisión y chasis
  "traccion": "4x2",
  "transmision": "CVT",
  "velocidades": "CVT continua",
  "neumaticos": "235/45 R18",
  "frenosDelanteros": "Disco ventilado",
  "frenosTraseros": "Disco sólido",
  "direccionAsistida": true,
  "direccionAsistidaTipo": "Eléctrica progresiva",

  // Equipamiento de confort
  "aireAcondicionado": true,
  "asientoDelanteroAjuste": true,
  "volanteRegulable": true,
  "asientosTraseros": "60/40 abatibles",
  "tapizados": "Cuero premium perforado",
  "cierrePuertas": "Eléctrico con keyless",
  "vidriosDelanteros": "Eléctricos con auto-up/down",
  "vidriosTraseros": "Eléctricos",
  "espejosExteriores": "Eléctricos plegables con calefacción",
  "farosAntiniebla": true,
  "computadoraBordo": true,
  "llantasAleacion": true,
  "camaraEstacionamiento": true,
  "asistenciaArranquePendientes": true,
  "controlEconomiaCombustible": true,
  "luzDiurna": true,

  // Equipamiento de seguridad
  "abs": true,
  "distribucionElectronicaFrenado": true,
  "asistenciaFrenadaEmergencia": true,
  "airbagsDelanteros": true,
  "airbagsCortina": "Delanteros y traseros",
  "airbagRodillaConductor": true,
  "airbagsLaterales": "Delanteros",
  "controlEstabilidad": true,
  "controlTraccion": true,
  "alarma": true,
  "inmovilizador": true,
  "sensorPresion": true,
  "avisoCambioCarril": true,
  "detectPuntosCiegos": true,
  "asistEstacionamiento": true,

  // Entretenimiento y comunicación
  "equipoMusica": "Sistema premium JBL con 9 parlantes",
  "comandosVolante": true,
  "conexionUSB": true,
  "conexionAuxiliar": true,
  "bluetooth": true,
  "pantalla": "9 pulgadas táctil HD",
  "gps": true,
  "appleCarplay": true,
  "mirrorLink": true,
  "sistemaNavegacion": true,
  "reconocimientoVoz": true,
  "cargadorInalambrico": true,

  "images": [
    {
      "id": "img123",
      "url": "/uploads/vehicle-1234567890.jpg",
      "vehicleId": "clz123abc456",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### 5. Crear Consulta de Contacto

```typescript
interface CreateContactData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  vehiculoInteres?: string;
}

export const createContact = async (contactData: CreateContactData) => {
  try {
    const response = await publicAPI.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error('Has enviado muchas consultas. Intenta de nuevo en unos minutos.');
    }
    throw error;
  }
};

// Ejemplo de uso en formulario de contacto
const ContactForm = ({ vehicleId, vehicleName }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    vehiculoInteres: vehicleName || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createContact(formData);
      setSuccess(true);
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '', vehiculoInteres: '' });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <div className="success">¡Consulta enviada exitosamente!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre completo"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono (opcional)"
        value={formData.telefono}
        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
      />
      <textarea
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Consulta'}
      </button>
    </form>
  );
};
```

## 🔐 Ejemplos de Autenticación y Dashboard

### 1. Autenticación de Usuario

```typescript
interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await privateAPI.post('/auth/login', credentials);
    const { access_token, user } = response.data;

    // Guardar token en localStorage
    localStorage.setItem('authToken', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token: access_token, user };
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Credenciales inválidas');
    }
    throw new Error('Error de conexión');
  }
};

// Ejemplo de uso en componente de login
const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token, user } = await login(credentials);
      console.log('Login exitoso:', user);
      // Redirigir al dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <input
          type="text"
          placeholder="Usuario"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};
```

### 2. Estadísticas del Dashboard

```typescript
export const getDashboardStats = async () => {
  try {
    const response = await privateAPI.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};

// Respuesta esperada:
{
  "total": 150,
  "destacados": 15,
  "porMarca": {
    "Toyota": 45,
    "Ford": 32,
    "Chevrolet": 28,
    "Volkswagen": 25,
    "otros": 20
  },
  "porCombustible": {
    "Nafta": 85,
    "Diesel": 45,
    "Híbrido": 15,
    "Eléctrico": 5
  },
  "porTransmision": {
    "Manual": 70,
    "Automática": 65,
    "CVT": 15
  },
  "precioPromedio": 28500,
  "anioPromedio": 2020
}

// Componente de estadísticas
const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!stats) return <div>Error al cargar estadísticas</div>;

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Total de Vehículos</h3>
        <p className="stat-number">{stats.total}</p>
      </div>
      <div className="stat-card">
        <h3>Vehículos Destacados</h3>
        <p className="stat-number">{stats.destacados}</p>
      </div>
      <div className="stat-card">
        <h3>Precio Promedio</h3>
        <p className="stat-number">${stats.precioPromedio.toLocaleString()}</p>
      </div>
      <div className="stat-card">
        <h3>Año Promedio</h3>
        <p className="stat-number">{stats.anioPromedio}</p>
      </div>
    </div>
  );
};
```

## 🚗 Crear Vehículo Completo

```typescript
export const createCompleteVehicle = async (vehicleData) => {
  try {
    const response = await privateAPI.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    throw error;
  }
};

// Ejemplo de vehículo completo con TODOS los campos
const completeVehicleExample = {
  // Campos obligatorios
  nombre: 'Toyota Camry Hybrid XLE',
  marca: 'Toyota',
  modelo: 'Camry',
  anio: 2024,
  precio: 45000,
  descripcion:
    'Sedán híbrido premium con tecnología de última generación y diseño elegante',

  // Información básica
  destacado: true,
  kilometraje: '0 km',
  observaciones: 'Vehículo 0 km con garantía extendida de 5 años',

  // Especificaciones del motor
  combustible: 'Híbrido',
  cilindrada: '2.5L + Motor eléctrico',
  potencia: '218 HP combinados',
  alimentacion: 'Inyección directa + Sistema híbrido',
  cilindros: 4,
  valvulas: 16,

  // Transmisión y chasis
  traccion: '4x2',
  transmision: 'CVT',
  velocidades: 'CVT continua',
  neumaticos: '235/45 R18 Michelin',
  frenosDelanteros: 'Disco ventilado de 12.9"',
  frenosTraseros: 'Disco sólido de 11.1"',
  direccionAsistida: true,
  direccionAsistidaTipo: 'Eléctrica progresiva',

  // Equipamiento de confort
  aireAcondicionado: true,
  asientoDelanteroAjuste: true,
  volanteRegulable: true,
  asientosTraseros: '60/40 abatibles con reposabrazos central',
  tapizados: 'Cuero premium perforado SofTex',
  cierrePuertas: 'Eléctrico con keyless entry y push start',
  vidriosDelanteros: 'Eléctricos con auto-up/down y anti-pinch',
  vidriosTraseros: 'Eléctricos con auto-up/down',
  espejosExteriores: 'Eléctricos plegables con calefacción y señal de giro',
  farosAntiniebla: true,
  computadoraBordo: true,
  llantasAleacion: true,
  camaraEstacionamiento: true,
  asistenciaArranquePendientes: true,
  controlEconomiaCombustible: true,
  luzDiurna: true,

  // Equipamiento de seguridad
  abs: true,
  distribucionElectronicaFrenado: true,
  asistenciaFrenadaEmergencia: true,
  airbagsDelanteros: true,
  airbagsCortina: 'Delanteros y traseros con sensor de impacto',
  airbagRodillaConductor: true,
  airbagsLaterales: 'Delanteros con sensor de posición',
  controlEstabilidad: true,
  controlTraccion: true,
  alarma: true,
  inmovilizador: true,
  sensorPresion: true,
  avisoCambioCarril: true,
  detectPuntosCiegos: true,
  asistEstacionamiento: true,

  // Entretenimiento y comunicación
  equipoMusica: 'Sistema premium JBL con 9 parlantes y subwoofer',
  comandosVolante: true,
  conexionUSB: true,
  conexionAuxiliar: true,
  bluetooth: true,
  pantalla: '9 pulgadas táctil HD con Android Auto',
  gps: true,
  appleCarplay: true,
  mirrorLink: true,
  sistemaNavegacion: true,
  reconocimientoVoz: true,
  cargadorInalambrico: true,
};

// Uso del ejemplo
const handleCreateVehicle = async () => {
  try {
    const newVehicle = await createCompleteVehicle(completeVehicleExample);
    console.log('Vehículo creado:', newVehicle);
    // Redirigir o actualizar lista
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 📤 Upload de Imágenes Múltiples

```typescript
export const uploadMultipleImages = async (vehicleId: string, files: FileList) => {
  try {
    const formData = new FormData();

    // Validar archivos antes de subir
    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isImage && isValidSize;
    });

    if (validFiles.length === 0) {
      throw new Error('No hay archivos válidos para subir');
    }

    if (validFiles.length > 10) {
      throw new Error('Máximo 10 imágenes por vehículo');
    }

    // Agregar archivos al FormData
    validFiles.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiFormData.post(`/vehicles/${vehicleId}/images`, formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    throw error;
  }
};

// Componente para upload de imágenes
const ImageUploader = ({ vehicleId, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    setProgress(0);

    try {
      const uploadedImages = await uploadMultipleImages(vehicleId, files);
      onUploadComplete(uploadedImages);
      // Limpiar input
      event.target.value = '';
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="image-uploader">
      <div className="upload-area">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="file-input"
        />
        <div className="upload-text">
          {uploading ? (
            <div>
              <p>Subiendo imágenes... {progress}%</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <p>Seleccionar imágenes (máximo 10, 5MB cada una)</p>
          )}
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
```

## 🔍 Búsqueda y Filtros Avanzados

```typescript
// Hook para manejo de filtros
const useVehicleFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    marca: '',
    combustible: '',
    transmision: '',
    traccion: '',
    anioMin: '',
    anioMax: '',
    precioMin: '',
    precioMax: '',
    destacado: null,
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);

  const applyFilters = async () => {
    setLoading(true);
    try {
      const response = await publicAPI.get('/vehicles', { params: filters });
      setVehicles(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset page when filter changes
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      marca: '',
      combustible: '',
      transmision: '',
      traccion: '',
      anioMin: '',
      anioMax: '',
      precioMin: '',
      precioMax: '',
      destacado: null,
      page: 1,
      limit: 12,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return {
    filters,
    vehicles,
    loading,
    meta,
    updateFilter,
    clearFilters,
    setFilters,
  };
};
```

## 🧪 Ejemplos de Testing

```typescript
// tests/api.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { publicAPI } from '../src/services/api';

describe('Public API Endpoints', () => {
  it('should fetch vehicles with pagination', async () => {
    const response = await publicAPI.get('/vehicles', {
      params: { page: 1, limit: 10 },
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data).toHaveProperty('meta');
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  it('should filter vehicles by marca', async () => {
    const response = await publicAPI.get('/vehicles', {
      params: { marca: 'Toyota' },
    });

    expect(response.status).toBe(200);
    response.data.data.forEach((vehicle) => {
      expect(vehicle.marca).toBe('Toyota');
    });
  });

  it('should get featured vehicles only', async () => {
    const response = await publicAPI.get('/vehicles/featured');

    expect(response.status).toBe(200);
    response.data.data.forEach((vehicle) => {
      expect(vehicle.destacado).toBe(true);
    });
  });
});
```

Esta documentación completa cubre todos los aspectos de la API con ejemplos prácticos y detallados para integración en aplicaciones reales.
