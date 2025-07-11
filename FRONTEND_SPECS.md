# Especificaciones para Desarrollo Frontend - NEXTCAR Dashboard

## 📋 Resumen del Proyecto

**NEXTCAR Dashboard API** es una API REST construida con NestJS para administrar vehículos, imágenes y contactos de una concesionaria de autos. El frontend debe ser un panel de administración completo para gestionar todos estos recursos.

## 🌐 Configuración de la API

- **URL Base**: `http://localhost:3000`
- **Documentación Swagger**: `http://localhost:3000/api`
- **CORS**: Habilitado para todas las origins
- **Base de Datos**: SQLite con Prisma ORM
- **Archivos estáticos**: Servidos desde `/uploads`

## 📊 Modelos de Datos

### 🚗 Vehicle (Vehículo)

El modelo principal del sistema con más de 60 campos categorizados:

#### Información Básica (Requeridos)

```typescript
{
  id: string; // CUID generado automáticamente
  nombre: string; // Nombre del vehículo
  marca: string; // Marca (ej: Toyota, Ford)
  modelo: string; // Modelo (ej: Corolla, Focus)
  anio: number; // Año (mínimo 1900)
  precio: number; // Precio (mínimo 0)
  descripcion: string; // Descripción detallada
  destacado: boolean; // Si está destacado (default: false)
  createdAt: DateTime; // Fecha de creación
  updatedAt: DateTime; // Fecha de actualización
}
```

#### Información Adicional (Opcionales)

```typescript
{
  kilometraje?: string;     // Ej: "50.000 km"
  observaciones?: string;   // Notas adicionales
}
```

#### Motor

```typescript
{
  combustible?: string;     // Diesel, Nafta, Híbrido, Eléctrico
  cilindrada?: string;      // Ej: "2.4"
  potencia?: string;        // Ej: "150 CV"
  alimentacion?: string;    // Ej: "Inyección Electrónica"
  cilindros?: number;       // Ej: 4
  valvulas?: number;        // Ej: 16
}
```

#### Transmisión y Chasis

```typescript
{
  traccion?: string;              // 4X2, 4X4
  transmision?: string;           // Manual, Automática, CVT
  velocidades?: string;           // Ej: "Caja de Sexta"
  neumaticos?: string;            // Ej: "R17"
  frenosDelanteros?: string;      // Ej: "Discos ventilados"
  frenosTraseros?: string;        // Ej: "Tambor"
  direccionAsistida?: boolean;    // Default: false
  direccionAsistidaTipo?: string; // Hidráulica, Eléctrica
}
```

#### Equipamiento - Confort

```typescript
{
  aireAcondicionado?: boolean;              // Default: false
  asientoDelanteroAjuste?: boolean;         // Default: false
  volanteRegulable?: boolean;               // Default: false
  asientosTraseros?: string;                // Ej: "Abatibles completamente"
  tapizados?: string;                       // Tela, Cuero, etc.
  cierrePuertas?: string;                   // Centralizado con mando a distancia
  vidriosDelanteros?: string;               // Eléctricos, Manuales
  vidriosTraseros?: string;                 // Eléctricos, Manuales
  espejosExteriores?: string;               // Eléctricos, Manuales
  farosAntiniebla?: boolean;                // Default: false
  computadoraBordo?: boolean;               // Default: false
  llantasAleacion?: boolean;                // Default: false
  camaraEstacionamiento?: boolean;          // Default: false
  asistenciaArranquePendientes?: boolean;   // Default: false
  controlEconomiaCombustible?: boolean;     // Default: false
  luzDiurna?: boolean;                      // Default: false
}
```

#### Equipamiento - Seguridad

```typescript
{
  abs?: boolean;                            // Default: false
  distribucionElectronicaFrenado?: boolean; // Default: false
  asistenciaFrenadaEmergencia?: boolean;    // Default: false
  airbagsDelanteros?: boolean;              // Default: false
  airbagsCortina?: string;                  // Delanteros, Traseros, Completos
  airbagRodillaConductor?: boolean;         // Default: false
  airbagsLaterales?: string;                // Delanteros, Traseros, Completos
  alarma?: boolean;                         // Default: false
  inmovilizadorMotor?: boolean;             // Default: false
  anclajeAsientosInfantiles?: boolean;      // Default: false
  autobloqueoPuertas?: boolean;             // Default: false
  controlEstabilidad?: boolean;             // Default: false
  controlTraccion?: boolean;                // Default: false
  cantidadAirbags?: number;                 // Número total de airbags
}
```

#### Comunicación y Entretenimiento

```typescript
{
  equipoMusica?: string;                    // AM-FM, CD, etc.
  comandosVolante?: boolean;                // Default: false
  conexionAuxiliar?: boolean;               // Default: false
  conexionUSB?: boolean;                    // Default: false
  interfazBluetooth?: boolean;              // Default: false
  controlVozDispositivos?: boolean;         // Default: false
  pantalla?: boolean;                       // Default: false
  sistemaNavegacionGPS?: boolean;           // Default: false
  appleCarPlay?: boolean;                   // Default: false
  mirrorlink?: boolean;                     // Default: false
}
```

#### Relaciones

```typescript
{
  images: Image[];  // Array de imágenes asociadas
}
```

### 📸 Image (Imagen)

```typescript
{
  id: string; // CUID generado automáticamente
  url: string; // URL de la imagen (ej: "/uploads/vehicle-123456.jpg")
  vehicleId: string; // ID del vehículo asociado
  createdAt: DateTime; // Fecha de creación
  vehicle: Vehicle; // Relación con el vehículo
}
```

### 📞 Contact (Contacto)

```typescript
{
  id: string; // CUID generado automáticamente
  nombre: string; // Nombre del contacto
  apellido: string; // Apellido del contacto
  ciudad: string; // Ciudad
  provincia: string; // Provincia
  telefono: string; // Número de teléfono
  email: string; // Email (validado)
  mensaje: string; // Mensaje del contacto
  creadoEn: DateTime; // Fecha de creación
}
```

## 🛠️ Endpoints de la API

### 🚗 Vehículos (`/vehicles`)

#### GET `/vehicles`

- **Descripción**: Obtener todos los vehículos
- **Respuesta**: Array de vehículos con imágenes incluidas
- **Ejemplo de respuesta**:

```json
[
  {
    "id": "clxxx...",
    "nombre": "Toyota Corolla XEI",
    "marca": "Toyota",
    "modelo": "Corolla",
    "anio": 2023,
    "precio": 25000,
    "descripcion": "Sedán compacto...",
    "destacado": true,
    "images": [
      {
        "id": "clyyy...",
        "url": "/uploads/vehicle-123456.jpg",
        "vehicleId": "clxxx...",
        "createdAt": "2024-01-01T10:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

#### GET `/vehicles/:id`

- **Descripción**: Obtener un vehículo específico
- **Parámetros**: `id` (string) - ID del vehículo
- **Respuesta**: Objeto vehículo completo con imágenes

#### POST `/vehicles`

- **Descripción**: Crear un nuevo vehículo
- **Body**: `CreateVehicleDto`
- **Campos requeridos**: `nombre`, `marca`, `modelo`, `anio`, `precio`, `descripcion`
- **Ejemplo de body**:

```json
{
  "nombre": "Toyota Corolla XEI",
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2023,
  "precio": 25000,
  "descripcion": "Sedán compacto con excelente rendimiento",
  "destacado": false,
  "combustible": "Nafta",
  "transmision": "Automática",
  "aireAcondicionado": true,
  "abs": true
}
```

#### PATCH `/vehicles/:id`

- **Descripción**: Actualizar un vehículo existente
- **Parámetros**: `id` (string) - ID del vehículo
- **Body**: `UpdateVehicleDto` (todos los campos opcionales)

#### DELETE `/vehicles/:id`

- **Descripción**: Eliminar un vehículo
- **Parámetros**: `id` (string) - ID del vehículo
- **Respuesta**: 204 No Content

#### PATCH `/vehicles/:id/highlight`

- **Descripción**: Marcar/desmarcar vehículo como destacado
- **Parámetros**: `id` (string) - ID del vehículo
- **Body**:

```json
{
  "destacado": true
}
```

#### POST `/vehicles/:id/images`

- **Descripción**: Subir imágenes para un vehículo
- **Parámetros**: `id` (string) - ID del vehículo
- **Content-Type**: `multipart/form-data`
- **Campo**: `images` (máximo 10 archivos)
- **Formatos**: JPG, JPEG, PNG, GIF
- **Tamaño máximo**: 5MB por archivo
- **Respuesta**: Array de imágenes creadas

### 📸 Imágenes (`/images`)

#### GET `/images`

- **Descripción**: Obtener todas las imágenes

#### GET `/images/:id`

- **Descripción**: Obtener una imagen específica
- **Parámetros**: `id` (string) - ID de la imagen

#### DELETE `/images/:id`

- **Descripción**: Eliminar una imagen
- **Parámetros**: `id` (string) - ID de la imagen
- **Respuesta**: 204 No Content

### 📞 Contactos (`/contacts`)

#### GET `/contacts`

- **Descripción**: Obtener todos los contactos
- **Respuesta**: Array de contactos ordenados por fecha

#### GET `/contacts/:id`

- **Descripción**: Obtener un contacto específico
- **Parámetros**: `id` (string) - ID del contacto

#### POST `/contacts`

- **Descripción**: Crear un nuevo contacto
- **Body**: `CreateContactDto`
- **Campos requeridos**: `nombre`, `apellido`, `ciudad`, `provincia`, `telefono`, `email`, `mensaje`
- **Ejemplo de body**:

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "ciudad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "telefono": "+54 11 1234-5678",
  "email": "juan.perez@email.com",
  "mensaje": "Estoy interesado en el Toyota Corolla"
}
```

#### DELETE `/contacts/:id`

- **Descripción**: Eliminar un contacto
- **Parámetros**: `id` (string) - ID del contacto
- **Respuesta**: 204 No Content

## 🎨 Recomendaciones para el Frontend

### Tecnologías Sugeridas

- **React** con **TypeScript**
- **Next.js** para SSR/SSG (opcional)
- **Tailwind CSS** para estilos
- **React Hook Form** para formularios
- **React Query/TanStack Query** para manejo de estado del servidor
- **React Router** para navegación
- **Axios** para peticiones HTTP

### Estructura de Páginas Recomendada

1. **Dashboard Principal**
   - Resumen de estadísticas (total vehículos, destacados, contactos)
   - Gráficos de vehículos por marca, año, precio
   - Lista de contactos recientes

2. **Gestión de Vehículos**
   - Lista de vehículos con filtros y búsqueda
   - Formulario de creación/edición con tabs por categoría:
     - Información básica
     - Motor
     - Transmisión y chasis
     - Equipamiento de confort
     - Equipamiento de seguridad
     - Comunicación y entretenimiento
   - Gestión de imágenes con drag & drop
   - Vista previa del vehículo

3. **Gestión de Contactos**
   - Lista de contactos con filtros por fecha, provincia
   - Vista detallada de contacto
   - Marcado como leído/no leído
   - Respuestas (opcional)

4. **Gestión de Imágenes**
   - Galería de todas las imágenes
   - Organización por vehículo
   - Eliminar imágenes no utilizadas

### Funcionalidades Clave del Frontend

#### Dashboard de Vehículos

- **Lista con filtros**: Por marca, modelo, año, precio, destacado
- **Búsqueda**: Por nombre, marca, modelo
- **Ordenamiento**: Por fecha, precio, año, nombre
- **Vista tarjeta/tabla**: Toggle entre vistas
- **Acciones rápidas**: Destacar, editar, eliminar
- **Paginación**: Para manejar muchos vehículos

#### Formulario de Vehículo

- **Validación en tiempo real**: Usando las validaciones del DTO
- **Organización por tabs**: Para manejar los muchos campos
- **Campos condicionales**: Mostrar campos relacionados solo cuando son relevantes
- **Preview en vivo**: Vista previa del vehículo mientras se edita
- **Auto-guardado**: Guardar cambios automáticamente

#### Gestión de Imágenes

- **Drag & Drop**: Para subir imágenes fácilmente
- **Preview**: Vista previa antes de subir
- **Reordenar**: Cambiar el orden de las imágenes
- **Imagen principal**: Marcar una imagen como principal
- **Optimización**: Redimensionar imágenes automáticamente

#### Dashboard de Contactos

- **Lista ordenada**: Por fecha más reciente
- **Estados**: Nuevo, leído, respondido
- **Filtros**: Por fecha, provincia, estado
- **Vista rápida**: Ver mensaje sin abrir detalle completo

### Validaciones del Frontend

Usar las mismas validaciones que los DTOs:

#### CreateVehicleDto/UpdateVehicleDto

- `nombre`: string, no vacío
- `marca`: string, no vacío
- `modelo`: string, no vacío
- `anio`: number, mínimo 1900
- `precio`: number, mínimo 0
- `descripcion`: string, no vacío
- Todos los demás campos son opcionales

#### CreateContactDto

- `nombre`: string, no vacío
- `apellido`: string, no vacío
- `ciudad`: string, no vacío
- `provincia`: string, no vacío
- `telefono`: string, no vacío
- `email`: email válido
- `mensaje`: string, no vacío

### Manejo de Errores

Manejar los siguientes tipos de errores:

- **400 Bad Request**: Errores de validación
- **404 Not Found**: Recurso no encontrado
- **413 Payload Too Large**: Archivo muy grande
- **415 Unsupported Media Type**: Tipo de archivo no soportado
- **500 Internal Server Error**: Error del servidor

### Estados de Carga

Implementar estados de carga para:

- Carga inicial de datos
- Envío de formularios
- Subida de imágenes
- Eliminación de recursos

## 🚀 Comandos para Desarrollar

### Iniciar la API

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

### Base de Datos

```bash
# Migrar base de datos
npm run db:migrate

# Generar cliente Prisma
npm run db:generate

# Sembrar datos de prueba
npm run db:seed

# Abrir Prisma Studio
npm run db:studio
```

### Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 📱 Responsive Design

El frontend debe ser completamente responsive:

- **Desktop**: Layout completo con sidebar
- **Tablet**: Layout adaptado con drawer colapsable
- **Mobile**: Navigation bottom/hamburger menu

## 🔒 Consideraciones de Seguridad

- **Validación**: Validar todos los inputs en frontend y backend
- **Sanitización**: Sanitizar datos antes de mostrar
- **Límites de archivo**: Respetar límites de tamaño y tipo
- **CORS**: Configurado para permitir el frontend

## 📊 Métricas y Analytics

Considerar implementar:

- Vehículos más vistos
- Contactos por mes
- Conversión de contactos
- Tiempo de permanencia en formularios

---

Este documento proporciona toda la información necesaria para desarrollar un frontend completo para el sistema NEXTCAR Dashboard. La API está completamente funcional y documentada, lista para ser consumida por cualquier aplicación frontend moderna.
