# Ejemplos de uso de la API

## Configuración inicial

1. **Instalar dependencias y configurar la base de datos:**

   ```bash
   # Ejecutar el script de configuración automática
   ./setup.sh
   ```

   O manualmente:

   ```bash
   # Instalar dependencias
   npm install

   # Iniciar PostgreSQL
   docker-compose up -d postgres

   # Ejecutar migraciones
   npm run db:migrate

   # Poblar con datos de prueba
   npm run db:seed
   ```

2. **Iniciar la aplicación:**

   ```bash
   npm run start:dev
   ```

3. **Acceder a la documentación:**
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/api

## Ejemplos de endpoints

### Vehículos

#### Obtener todos los vehículos

```bash
GET http://localhost:3000/vehicles
```

#### Crear un nuevo vehículo

```bash
POST http://localhost:3000/vehicles
Content-Type: application/json

{
  "nombre": "Corolla XEI",
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2023,
  "motor": "2.0L 4 cilindros",
  "tipo": "Sedan",
  "precio": 25000,
  "descripcion": "Vehículo en excelente estado",
  "destacado": true
}
```

#### Actualizar un vehículo

```bash
PATCH http://localhost:3000/vehicles/{id}
Content-Type: application/json

{
  "precio": 24000,
  "destacado": false
}
```

#### Destacar un vehículo

```bash
PATCH http://localhost:3000/vehicles/{id}/highlight
Content-Type: application/json

{
  "destacado": true
}
```

#### Subir imágenes a un vehículo

```bash
POST http://localhost:3000/vehicles/{id}/images
Content-Type: multipart/form-data

# Usar form-data con campo "images" (múltiples archivos)
```

### Contactos

#### Obtener todos los contactos

```bash
GET http://localhost:3000/contacts
```

#### Crear un nuevo contacto

```bash
POST http://localhost:3000/contacts
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "ciudad": "Buenos Aires",
  "provincia": "Buenos Aires",
  "telefono": "+54 11 1234-5678",
  "email": "juan.perez@example.com",
  "mensaje": "Estoy interesado en el Toyota Corolla"
}
```

### Imágenes

#### Obtener todas las imágenes

```bash
GET http://localhost:3000/images
```

#### Eliminar una imagen

```bash
DELETE http://localhost:3000/images/{id}
```

## Respuestas de ejemplo

### Vehículo con imágenes

```json
{
  "id": "clq7...",
  "nombre": "Corolla XEI",
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2023,
  "motor": "2.0L 4 cilindros",
  "tipo": "Sedan",
  "precio": 25000,
  "descripcion": "Vehículo en excelente estado",
  "destacado": true,
  "createdAt": "2023-12-15T10:30:00Z",
  "updatedAt": "2023-12-15T10:30:00Z",
  "images": [
    {
      "id": "clq8...",
      "url": "/uploads/vehicle-1702641000123-456789.jpg",
      "vehicleId": "clq7...",
      "createdAt": "2023-12-15T10:30:00Z"
    }
  ]
}
```

### Lista de contactos

```json
[
  {
    "id": "clq9...",
    "nombre": "Juan",
    "apellido": "Pérez",
    "ciudad": "Buenos Aires",
    "provincia": "Buenos Aires",
    "telefono": "+54 11 1234-5678",
    "email": "juan.perez@example.com",
    "mensaje": "Estoy interesado en el Toyota Corolla",
    "creadoEn": "2023-12-15T10:30:00Z"
  }
]
```

## Códigos de estado HTTP

- `200` - OK (operación exitosa)
- `201` - Created (recurso creado)
- `204` - No Content (eliminación exitosa)
- `400` - Bad Request (datos inválidos)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)

## Validaciones

### Vehículo

- `nombre`: Requerido, string no vacío
- `marca`: Requerido, string no vacío
- `modelo`: Requerido, string no vacío
- `anio`: Requerido, número >= 1900
- `motor`: Requerido, string no vacío
- `tipo`: Requerido, string no vacío
- `precio`: Requerido, número >= 0
- `descripcion`: Requerido, string no vacío
- `destacado`: Opcional, boolean

### Contacto

- `nombre`: Requerido, string no vacío
- `apellido`: Requerido, string no vacío
- `ciudad`: Requerido, string no vacío
- `provincia`: Requerido, string no vacío
- `telefono`: Requerido, string no vacío
- `email`: Requerido, email válido
- `mensaje`: Requerido, string no vacío

### Upload de imágenes

- Formatos permitidos: jpg, jpeg, png, gif
- Tamaño máximo: 5MB por archivo
- Máximo 10 archivos por solicitud
