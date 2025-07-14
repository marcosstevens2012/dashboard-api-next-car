# 📚 Documentación Completa de la API - NEXTCAR Dashboard

## 🔗 URL Base

```
http://localhost:3001
```

## 📋 Índice de Contenidos

1. [Endpoints Públicos](#endpoints-públicos)
2. [Endpoints de Autenticación](#endpoints-de-autenticación)
3. [Endpoints de Vehículos](#endpoints-de-vehículos)
4. [Endpoints de Imágenes](#endpoints-de-imágenes)
5. [Endpoints de Contactos](#endpoints-de-contactos)
6. [Endpoints del Dashboard (Privados)](#endpoints-del-dashboard-privados)
7. [Modelos de Datos](#modelos-de-datos)
8. [Códigos de Error](#códigos-de-error)
9. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🌐 Endpoints Públicos

Los endpoints públicos están disponibles sin autenticación y tienen limitaciones de velocidad (rate limiting).

### GET /public/vehicles

**Descripción**: Obtiene lista paginada de vehículos con filtros.

**Rate Limit**: 100 requests por minuto

**Query Parameters**:

- `page` (optional, number): Número de página (default: 1)
- `limit` (optional, number): Elementos por página (default: 10, max: 100)
- `sortBy` (optional, string): Campo para ordenar (`nombre`, `marca`, `precio`, `anio`, `createdAt`)
- `sortOrder` (optional, string): Orden (`asc`, `desc`)
- `search` (optional, string): Búsqueda en nombre, marca, modelo
- `marca` (optional, string): Filtrar por marca
- `combustible` (optional, string): Filtrar por tipo de combustible
- `transmision` (optional, string): Filtrar por transmisión
- `traccion` (optional, string): Filtrar por tracción
- `anioMin` (optional, number): Año mínimo
- `anioMax` (optional, number): Año máximo
- `precioMin` (optional, number): Precio mínimo
- `precioMax` (optional, number): Precio máximo
- `kilometrajeMax` (optional, string): Kilometraje máximo
- `destacado` (optional, boolean): Solo vehículos destacados

**Respuesta**:

```json
{
  "data": [
    {
      "id": "clz123abc456",
      "nombre": "Toyota Corolla XEI",
      "marca": "Toyota",
      "modelo": "Corolla",
      "anio": 2023,
      "precio": 25000,
      "descripcion": "Sedán compacto con excelente rendimiento",
      "destacado": true,
      "kilometraje": "15.000 km",
      "combustible": "Nafta",
      "transmision": "Automática",
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
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### GET /public/vehicles/featured

**Descripción**: Obtiene solo vehículos destacados con paginación.

**Rate Limit**: 50 requests por minuto

**Query Parameters**:

- `page` (optional, number): Número de página
- `limit` (optional, number): Elementos por página
- `sortBy` (optional, string): Campo para ordenar
- `sortOrder` (optional, string): Orden

**Respuesta**: Igual estructura que `/public/vehicles`

### GET /public/vehicles/filter-options

**Descripción**: Obtiene opciones disponibles para filtros.

**Rate Limit**: 20 requests por minuto

**Respuesta**:

```json
{
  "marcas": ["Toyota", "Ford", "Chevrolet", "Volkswagen"],
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
```

### GET /public/vehicles/:id

**Descripción**: Obtiene un vehículo específico por ID.

**Rate Limit**: 50 requests por minuto

**Parámetros**:

- `id` (string): ID del vehículo

**Respuesta**:

```json
{
  "id": "clz123abc456",
  "nombre": "Toyota Corolla XEI",
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2023,
  "precio": 25000,
  "descripcion": "Sedán compacto con excelente rendimiento",
  "destacado": true,
  "kilometraje": "15.000 km",
  "observaciones": "Único dueño, service al día",

  // Motor
  "combustible": "Nafta",
  "cilindrada": "1.8L",
  "potencia": "140 HP",
  "alimentacion": "Inyección",
  "cilindros": 4,
  "valvulas": 16,

  // Transmisión
  "traccion": "4x2",
  "transmision": "Automática",
  "velocidades": "CVT",
  "neumaticos": "205/55 R16",
  "frenosDelanteros": "Disco ventilado",
  "frenosTraseros": "Disco sólido",
  "direccionAsistida": true,
  "direccionAsistidaTipo": "Eléctrica",

  // Confort
  "aireAcondicionado": true,
  "asientoDelanteroAjuste": true,
  "volanteRegulable": true,
  "asientosTraseros": "60/40",
  "tapizados": "Tela premium",
  "cierrePuertas": "Eléctrico",
  "vidriosDelanteros": "Eléctricos",
  "vidriosTraseros": "Eléctricos",
  "espejosExteriores": "Eléctricos con calefacción",
  "farosAntiniebla": true,
  "computadoraBordo": true,
  "llantasAleacion": true,
  "camaraEstacionamiento": true,

  // Seguridad
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

  // Entretenimiento
  "equipoMusica": "Radio AM/FM con CD",
  "comandosVolante": true,
  "conexionUSB": true,
  "conexionAuxiliar": true,
  "bluetooth": true,
  "pantalla": "7 pulgadas táctil",
  "gps": true,
  "appleCarplay": true,
  "mirrorLink": true,

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

### POST /public/contacts

**Descripción**: Crea una nueva consulta de contacto.

**Rate Limit**: 5 requests por 5 minutos

**Body**:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "+54 9 11 1234-5678",
  "mensaje": "Estoy interesado en el Toyota Corolla",
  "vehiculoInteres": "Toyota Corolla XEI"
}
```

**Respuesta**:

```json
{
  "id": "contact123",
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "+54 9 11 1234-5678",
  "mensaje": "Estoy interesado en el Toyota Corolla",
  "vehiculoInteres": "Toyota Corolla XEI",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

---

## 🔐 Endpoints de Autenticación

### POST /auth/login

**Descripción**: Autentica un usuario y devuelve un JWT token.

**Body**:

```json
{
  "username": "admin",
  "password": "password123"
}
```

**Respuesta Exitosa**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "username": "admin"
  }
}
```

**Respuesta de Error** (401):

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

## 🚗 Endpoints de Vehículos

### GET /vehicles

**Descripción**: Lista todos los vehículos con paginación y filtros.

**Autenticación**: No requerida

**Query Parameters**: Mismos que `/public/vehicles`

### GET /vehicles/featured

**Descripción**: Obtiene vehículos destacados.

### GET /vehicles/stats

**Descripción**: Obtiene estadísticas de vehículos.

**Respuesta**:

```json
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
```

### GET /vehicles/filter-options

**Descripción**: Opciones para filtros.

### GET /vehicles/:id

**Descripción**: Obtiene un vehículo específico.

### POST /vehicles

**Descripción**: Crea un nuevo vehículo.

**Autenticación**: No requerida

**Body**:

```json
{
  "nombre": "Ford Focus Titanium",
  "marca": "Ford",
  "modelo": "Focus",
  "anio": 2022,
  "precio": 22000,
  "descripcion": "Hatchback premium con tecnología avanzada",
  "destacado": false,
  "kilometraje": "25.000 km",
  "observaciones": "Único dueño, service al día",

  // Campos opcionales del motor
  "combustible": "Nafta",
  "cilindrada": "2.0L",
  "potencia": "150 HP",
  "alimentacion": "Inyección directa",
  "cilindros": 4,
  "valvulas": 16,

  // Campos opcionales de transmisión
  "traccion": "4x2",
  "transmision": "Automática",
  "velocidades": "6 velocidades",
  "neumaticos": "215/50 R17",
  "frenosDelanteros": "Disco ventilado",
  "frenosTraseros": "Disco sólido",
  "direccionAsistida": true,
  "direccionAsistidaTipo": "Eléctrica",

  // Equipamiento de confort (todos opcionales, boolean o string según corresponda)
  "aireAcondicionado": true,
  "asientoDelanteroAjuste": true,
  "volanteRegulable": true,
  "asientosTraseros": "60/40",
  "tapizados": "Cuero",
  "cierrePuertas": "Eléctrico",
  "vidriosDelanteros": "Eléctricos",
  "vidriosTraseros": "Eléctricos",
  "espejosExteriores": "Eléctricos plegables",
  "farosAntiniebla": true,
  "computadoraBordo": true,
  "llantasAleacion": true,
  "camaraEstacionamiento": true,
  "asistenciaArranquePendientes": true,
  "controlEconomiaCombustible": true,
  "luzDiurna": true,

  // Equipamiento de seguridad (todos opcionales)
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

  // Entretenimiento y comunicación (todos opcionales)
  "equipoMusica": "Radio AM/FM con CD y MP3",
  "comandosVolante": true,
  "conexionUSB": true,
  "conexionAuxiliar": true,
  "bluetooth": true,
  "pantalla": "8 pulgadas táctil",
  "gps": true,
  "appleCarplay": true,
  "mirrorLink": true,
  "sistemaNavegacion": true,
  "reconocimientoVoz": true,
  "cargadorInalambrico": true
}
```

### PATCH /vehicles/:id

**Descripción**: Actualiza un vehículo existente.

**Body**: Misma estructura que POST, pero todos los campos son opcionales.

### DELETE /vehicles/:id

**Descripción**: Elimina un vehículo.

**Respuesta**: 204 No Content

### PATCH /vehicles/:id/highlight

**Descripción**: Marca/desmarca un vehículo como destacado.

**Body**:

```json
{
  "destacado": true
}
```

### POST /vehicles/:id/images

**Descripción**: Sube imágenes a un vehículo.

**Content-Type**: multipart/form-data

**Form Data**:

- `images`: Array de archivos (máximo 10)
  - Formatos permitidos: jpg, jpeg, png, gif
  - Tamaño máximo: 5MB por archivo

**Respuesta**:

```json
[
  {
    "id": "img123",
    "url": "/uploads/vehicle-1234567890.jpg",
    "vehicleId": "clz123abc456",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🖼️ Endpoints de Imágenes

### GET /images

**Descripción**: Lista todas las imágenes.

**Respuesta**:

```json
[
  {
    "id": "img123",
    "url": "/uploads/vehicle-1234567890.jpg",
    "vehicleId": "clz123abc456",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /images/:id

**Descripción**: Obtiene una imagen específica.

### DELETE /images/:id

**Descripción**: Elimina una imagen.

**Respuesta**: 204 No Content

---

## 📞 Endpoints de Contactos

### GET /contacts

**Descripción**: Lista todos los contactos.

**Respuesta**:

```json
[
  {
    "id": "contact123",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "+54 9 11 1234-5678",
    "mensaje": "Estoy interesado en el Toyota Corolla",
    "vehiculoInteres": "Toyota Corolla XEI",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### GET /contacts/:id

**Descripción**: Obtiene un contacto específico.

### POST /contacts

**Descripción**: Crea un nuevo contacto.

**Body**:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "+54 9 11 1234-5678",
  "mensaje": "Estoy interesado en el Toyota Corolla",
  "vehiculoInteres": "Toyota Corolla XEI"
}
```

### DELETE /contacts/:id

**Descripción**: Elimina un contacto.

**Respuesta**: 204 No Content

---

## 🔒 Endpoints del Dashboard (Privados)

**Autenticación**: Requiere JWT token en header `Authorization: Bearer <token>`

### GET /dashboard/stats

**Descripción**: Estadísticas para el dashboard.

### GET /dashboard/vehicles

**Descripción**: Lista completa de vehículos para administración.

### POST /dashboard/vehicles

**Descripción**: Crea vehículo (mismo que `/vehicles`).

### GET /dashboard/vehicles/:id

**Descripción**: Obtiene vehículo específico.

### PATCH /dashboard/vehicles/:id

**Descripción**: Actualiza vehículo.

### DELETE /dashboard/vehicles/:id

**Descripción**: Elimina vehículo.

### PATCH /dashboard/vehicles/:id/highlight

**Descripción**: Destaca/quita destacado.

### POST /dashboard/vehicles/:id/images

**Descripción**: Sube imágenes.

### GET /dashboard/contacts

**Descripción**: Lista contactos para administración.

### GET /dashboard/contacts/:id

**Descripción**: Obtiene contacto específico.

### DELETE /dashboard/contacts/:id

**Descripción**: Elimina contacto.

### GET /dashboard/images

**Descripción**: Lista todas las imágenes.

### DELETE /dashboard/images/:id

**Descripción**: Elimina imagen.

---

## 📊 Modelos de Datos

### Vehículo Completo

```typescript
interface Vehicle {
  // Campos obligatorios
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  descripcion: string;

  // Campos opcionales básicos
  destacado?: boolean;
  kilometraje?: string;
  observaciones?: string;

  // Motor
  combustible?: string; // "Nafta", "Diesel", "Híbrido", "Eléctrico"
  cilindrada?: string; // "1.6L", "2.0L", etc.
  potencia?: string; // "120 HP", "150 CV", etc.
  alimentacion?: string; // "Inyección", "Inyección directa", etc.
  cilindros?: number; // 3, 4, 6, 8, etc.
  valvulas?: number; // 12, 16, 24, etc.

  // Transmisión y chasis
  traccion?: string; // "4x2", "4x4", "AWD"
  transmision?: string; // "Manual", "Automática", "CVT"
  velocidades?: string; // "5 velocidades", "6 velocidades", "CVT"
  neumaticos?: string; // "205/55 R16", etc.
  frenosDelanteros?: string; // "Disco", "Disco ventilado"
  frenosTraseros?: string; // "Disco", "Tambor"
  direccionAsistida?: boolean;
  direccionAsistidaTipo?: string; // "Hidráulica", "Eléctrica"

  // Equipamiento - Confort
  aireAcondicionado?: boolean;
  asientoDelanteroAjuste?: boolean;
  volanteRegulable?: boolean;
  asientosTraseros?: string; // "60/40", "Fijos", etc.
  tapizados?: string; // "Tela", "Cuero", "Símil cuero"
  cierrePuertas?: string; // "Manual", "Eléctrico"
  vidriosDelanteros?: string; // "Manuales", "Eléctricos"
  vidriosTraseros?: string; // "Manuales", "Eléctricos"
  espejosExteriores?: string; // "Manuales", "Eléctricos", "Eléctricos plegables"
  farosAntiniebla?: boolean;
  computadoraBordo?: boolean;
  llantasAleacion?: boolean;
  camaraEstacionamiento?: boolean;
  asistenciaArranquePendientes?: boolean;
  controlEconomiaCombustible?: boolean;
  luzDiurna?: boolean;

  // Equipamiento - Seguridad
  abs?: boolean;
  distribucionElectronicaFrenado?: boolean;
  asistenciaFrenadaEmergencia?: boolean;
  airbagsDelanteros?: boolean;
  airbagsCortina?: string; // "No", "Delanteros", "Delanteros y traseros"
  airbagRodillaConductor?: boolean;
  airbagsLaterales?: string; // "No", "Delanteros", "Delanteros y traseros"
  controlEstabilidad?: boolean;
  controlTraccion?: boolean;
  alarma?: boolean;
  inmovilizador?: boolean;
  sensorPresion?: boolean;
  avisoCambioCarril?: boolean;
  detectPuntosCiegos?: boolean;
  asistEstacionamiento?: boolean;

  // Comunicación y entretenimiento
  equipoMusica?: string; // "Radio AM/FM", "Radio con CD", etc.
  comandosVolante?: boolean;
  conexionUSB?: boolean;
  conexionAuxiliar?: boolean;
  bluetooth?: boolean;
  pantalla?: string; // "No", "5 pulgadas", "7 pulgadas táctil"
  gps?: boolean;
  appleCarplay?: boolean;
  mirrorLink?: boolean;
  sistemaNavegacion?: boolean;
  reconocimientoVoz?: boolean;
  cargadorInalambrico?: boolean;

  // Relaciones
  images?: Image[];

  // Timestamps
  createdAt: string;
  updatedAt: string;
}
```

### Imagen

```typescript
interface Image {
  id: string;
  url: string;
  vehicleId: string;
  createdAt: string;
}
```

### Contacto

```typescript
interface Contact {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  vehiculoInteres?: string;
  createdAt: string;
}
```

### Paginación

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
```

---

## ❌ Códigos de Error

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": [
    "precio must be a positive number",
    "anio must be between 1900 and 2030"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Vehicle not found",
  "error": "Not Found"
}
```

### 413 Payload Too Large

```json
{
  "statusCode": 413,
  "message": "File too large",
  "error": "Payload Too Large"
}
```

### 429 Too Many Requests

```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "error": "Too Many Requests"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 💡 Ejemplos de Uso

### Búsqueda de Vehículos con Filtros

```bash
curl -X GET "http://localhost:3001/public/vehicles?search=toyota&marca=Toyota&precioMin=20000&precioMax=30000&anioMin=2020&page=1&limit=5&sortBy=precio&sortOrder=asc"
```

### Crear un Vehículo Completo

```bash
curl -X POST http://localhost:3001/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Toyota Camry Hybrid",
    "marca": "Toyota",
    "modelo": "Camry",
    "anio": 2023,
    "precio": 35000,
    "descripcion": "Sedán híbrido premium con tecnología avanzada",
    "destacado": true,
    "kilometraje": "0 km",
    "combustible": "Híbrido",
    "cilindrada": "2.5L + Motor eléctrico",
    "potencia": "218 HP combinados",
    "transmision": "CVT",
    "traccion": "4x2",
    "aireAcondicionado": true,
    "abs": true,
    "bluetooth": true,
    "gps": true,
    "appleCarplay": true
  }'
```

### Subir Imágenes a un Vehículo

```bash
curl -X POST http://localhost:3001/vehicles/clz123abc456/images \
  -F "images=@imagen1.jpg" \
  -F "images=@imagen2.jpg" \
  -F "images=@imagen3.jpg"
```

### Autenticación y Uso del Dashboard

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}' \
  | jq -r '.access_token')

# 2. Usar el token para acceder al dashboard
curl -X GET http://localhost:3001/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

### Crear Contacto desde Formulario Web

```bash
curl -X POST http://localhost:3001/public/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González",
    "email": "maria@email.com",
    "telefono": "+54 9 11 9876-5432",
    "mensaje": "Me interesa el Toyota Camry Hybrid. ¿Está disponible para una prueba de manejo?",
    "vehiculoInteres": "Toyota Camry Hybrid"
  }'
```

---

## 🔧 Configuración de Cliente

### JavaScript/TypeScript

```typescript
import axios from 'axios';

// Cliente para endpoints públicos
const publicAPI = axios.create({
  baseURL: 'http://localhost:3001/public',
  timeout: 10000,
});

// Cliente para endpoints autenticados
const privateAPI = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

// Interceptor para agregar token
privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ejemplo de uso
const getVehicles = async (filters = {}) => {
  const response = await publicAPI.get('/vehicles', { params: filters });
  return response.data;
};

const createVehicle = async (vehicleData) => {
  const response = await privateAPI.post('/vehicles', vehicleData);
  return response.data;
};
```

### React Hook Example

```typescript
import { useState, useEffect } from 'react';

const useVehicles = (filters = {}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await getVehicles(filters);
        setVehicles(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [JSON.stringify(filters)]);

  return { vehicles, loading, error };
};
```
