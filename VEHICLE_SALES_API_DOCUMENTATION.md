# API de Ventas de Vehículos - Documentación

Este documento describe el nuevo endpoint para manejar formularios de clientes que quieren vender sus vehículos.

## Endpoint Base

```
/vehicle-sales
```

## Endpoints Disponibles

### 1. Crear Nueva Venta de Vehículo

**POST** `/vehicle-sales`

Permite a los clientes enviar un formulario con sus datos y la información básica del vehículo que desean vender.

#### Payload de Ejemplo:

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "ciudad": "Buenos Aires",
  "provincia": "CABA",
  "telefono": "+54 11 1234-5678",
  "email": "juan.perez@email.com",
  "mensaje": "Quiero vender mi auto urgente",
  "vehiculoMarca": "Toyota",
  "vehiculoModelo": "Corolla",
  "vehiculoAnio": 2018,
  "vehiculoKilometraje": "85000",
  "vehiculoCombustible": "Nafta",
  "vehiculoTransmision": "Manual",
  "vehiculoDescripcion": "Auto en excelente estado, siempre garage",
  "precioEsperado": 8500000
}
```

#### Campos Requeridos:

- `nombre`: Nombre del cliente
- `apellido`: Apellido del cliente
- `ciudad`: Ciudad del cliente
- `provincia`: Provincia del cliente
- `telefono`: Teléfono de contacto
- `email`: Email válido
- `vehiculoMarca`: Marca del vehículo
- `vehiculoModelo`: Modelo del vehículo
- `vehiculoAnio`: Año del vehículo (número)

#### Campos Opcionales:

- `mensaje`: Mensaje adicional del cliente
- `vehiculoKilometraje`: Kilometraje del vehículo
- `vehiculoCombustible`: Tipo de combustible
- `vehiculoTransmision`: Tipo de transmisión
- `vehiculoDescripcion`: Descripción detallada del vehículo
- `precioEsperado`: Precio esperado por la venta (número decimal)

#### Respuesta Exitosa (201):

```json
{
  "id": "93fe54f9-ea33-4d7f-95b3-87d0949f4875",
  "nombre": "Juan",
  "apellido": "Pérez",
  "ciudad": "Buenos Aires",
  "provincia": "CABA",
  "telefono": "+54 11 1234-5678",
  "email": "juan.perez@email.com",
  "mensaje": "Quiero vender mi auto urgente",
  "vehiculoMarca": "Toyota",
  "vehiculoModelo": "Corolla",
  "vehiculoAnio": 2018,
  "vehiculoKilometraje": "85000",
  "vehiculoCombustible": "Nafta",
  "vehiculoTransmision": "Manual",
  "vehiculoDescripcion": "Auto en excelente estado, siempre garage",
  "precioEsperado": "8500000.00",
  "procesado": false,
  "creadoEn": "2025-07-28T02:24:38.918Z"
}
```

### 2. Obtener Todas las Ventas

**GET** `/vehicle-sales`

Obtiene todas las solicitudes de venta ordenadas por fecha de creación (más recientes primero).

#### Respuesta:

```json
[
  {
    "id": "93fe54f9-ea33-4d7f-95b3-87d0949f4875",
    "nombre": "Juan",
    "apellido": "Pérez"
    // ... resto de campos
  }
]
```

### 3. Obtener Venta Específica

**GET** `/vehicle-sales/:id`

Obtiene una solicitud de venta específica por su ID.

#### Parámetros:

- `id`: UUID de la venta

#### Respuesta Exitosa (200):

```json
{
  "id": "93fe54f9-ea33-4d7f-95b3-87d0949f4875",
  "nombre": "Juan",
  "apellido": "Pérez"
  // ... resto de campos
}
```

#### Error (404):

```json
{
  "statusCode": 404,
  "message": "Venta de vehículo con ID [id] no encontrada",
  "error": "Not Found"
}
```

### 4. Marcar como Procesada

**PATCH** `/vehicle-sales/:id/process`

Marca una solicitud de venta como procesada (útil para el flujo de trabajo interno).

#### Parámetros:

- `id`: UUID de la venta

#### Respuesta:

```json
{
  "id": "93fe54f9-ea33-4d7f-95b3-87d0949f4875",
  "procesado": true
  // ... resto de campos
}
```

### 5. Eliminar Venta

**DELETE** `/vehicle-sales/:id`

Elimina una solicitud de venta.

#### Parámetros:

- `id`: UUID de la venta

#### Respuesta: 204 No Content

## Estructura de la Base de Datos

La tabla `vehicle_sales` incluye:

### Información del Cliente:

- `id` (UUID, PK)
- `nombre`
- `apellido`
- `ciudad`
- `provincia`
- `telefono`
- `email`
- `mensaje` (opcional)

### Información del Vehículo:

- `vehiculoMarca`
- `vehiculoModelo`
- `vehiculoAnio`
- `vehiculoKilometraje` (opcional)
- `vehiculoCombustible` (opcional)
- `vehiculoTransmision` (opcional)
- `vehiculoDescripcion` (opcional)
- `precioEsperado` (opcional, decimal)

### Control de Estado:

- `procesado` (boolean, default: false)
- `creadoEn` (timestamp)

## Diferencias con el Endpoint de Contactos

Este nuevo endpoint se diferencia del endpoint de contactos (`/contacts`) en que:

1. **Enfoque específico**: Diseñado específicamente para ventas de vehículos
2. **Datos del vehículo**: Incluye campos específicos para información del vehículo
3. **Estado de procesamiento**: Incluye funcionalidad para marcar como procesado
4. **Precio esperado**: Campo para que el cliente indique su expectativa de precio

## Ejemplo de Uso en Frontend

```javascript
// Crear nueva solicitud de venta
const crearSolicitudVenta = async (formData) => {
  try {
    const response = await fetch('/vehicle-sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const nuevaVenta = await response.json();
      console.log('Venta creada:', nuevaVenta);
      return nuevaVenta;
    }
  } catch (error) {
    console.error('Error al crear venta:', error);
  }
};
```

## Testing

Se ha incluido un script de prueba `test_vehicle_sales.sh` que puedes ejecutar para probar todos los endpoints:

```bash
./test_vehicle_sales.sh
```

Este script prueba:

- Creación de nueva venta
- Obtener todas las ventas
- Obtener venta específica
- Marcar como procesada
- Verificar estado actualizado
