# API de Ordenamiento de Imágenes

## Endpoint para ordenar imágenes

### `PATCH /images/order`

Este endpoint permite actualizar el orden de visualización de múltiples imágenes de forma eficiente.

#### Descripción

- Permite reordenar las imágenes enviando un array con los IDs de las imágenes y su nuevo orden
- Útil para interfaces de usuario que permiten arrastrar y soltar imágenes
- Valida que todas las imágenes existan antes de actualizar
- Retorna las imágenes actualizadas ordenadas por `sortOrder`

#### Request Body

```json
{
  "images": [
    {
      "id": "uuid-de-imagen-1",
      "sortOrder": 1
    },
    {
      "id": "uuid-de-imagen-2",
      "sortOrder": 2
    },
    {
      "id": "uuid-de-imagen-3",
      "sortOrder": 3
    }
  ]
}
```

#### Validaciones

- `images`: Array requerido de objetos de imagen
- `images[].id`: UUID requerido de la imagen
- `images[].sortOrder`: Número requerido para el orden (puede ser cualquier número entero)

#### Response (200 OK)

```json
[
  {
    "id": "uuid-de-imagen-1",
    "url": "https://res.cloudinary.com/tu-cloud/image/upload/v1234567890/imagen1.webp",
    "publicId": "nextcar-vehicles/imagen1",
    "filename": "imagen1.jpg",
    "isPrincipal": false,
    "sortOrder": 1,
    "vehicleId": "uuid-del-vehiculo",
    "createdAt": "2025-08-14T14:30:00.000Z",
    "vehicle": {
      "id": "uuid-del-vehiculo",
      "marca": "Toyota",
      "modelo": "Corolla"
    }
  },
  {
    "id": "uuid-de-imagen-2",
    "url": "https://res.cloudinary.com/tu-cloud/image/upload/v1234567891/imagen2.webp",
    "publicId": "nextcar-vehicles/imagen2",
    "filename": "imagen2.jpg",
    "isPrincipal": false,
    "sortOrder": 2,
    "vehicleId": "uuid-del-vehiculo",
    "createdAt": "2025-08-14T14:31:00.000Z",
    "vehicle": {
      "id": "uuid-del-vehiculo",
      "marca": "Toyota",
      "modelo": "Corolla"
    }
  }
]
```

#### Códigos de Error

**400 Bad Request**

```json
{
  "statusCode": 400,
  "message": [
    "images must be an array",
    "images.0.id must be a UUID",
    "images.0.sortOrder must be a number"
  ],
  "error": "Bad Request"
}
```

**404 Not Found**

```json
{
  "statusCode": 404,
  "message": "One or more images not found",
  "error": "Not Found"
}
```

## Ejemplo de uso con cURL

```bash
curl -X PATCH http://localhost:3000/images/order \
  -H "Content-Type: application/json" \
  -d '{
    "images": [
      {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "sortOrder": 1
      },
      {
        "id": "f47ac10b-58cc-4372-a567-0e02b2c3d480",
        "sortOrder": 2
      }
    ]
  }'
```

## Ejemplo de uso con JavaScript/Fetch

```javascript
const updateImagesOrder = async (images) => {
  try {
    const response = await fetch('/images/order', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images }),
    });

    if (!response.ok) {
      throw new Error('Error updating images order');
    }

    const updatedImages = await response.json();
    return updatedImages;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Uso
const imagesToOrder = [
  { id: 'uuid-1', sortOrder: 1 },
  { id: 'uuid-2', sortOrder: 2 },
  { id: 'uuid-3', sortOrder: 3 },
];

updateImagesOrder(imagesToOrder)
  .then((orderedImages) => {
    console.log('Images reordered successfully:', orderedImages);
  })
  .catch((error) => {
    console.error('Failed to reorder images:', error);
  });
```

## Consideraciones importantes

1. **Orden flexible**: Los números de `sortOrder` no necesitan ser consecutivos. Puedes usar 10, 20, 30 para permitir insertar elementos entre ellos más tarde.

2. **Transaccionalidad**: La operación es transaccional, si alguna imagen no existe, no se actualiza ninguna.

3. **Orden actual**: Las imágenes se ordenan automáticamente por:
   - `isPrincipal: DESC` (imagen principal primero)
   - `sortOrder: ASC` (orden personalizado)
   - `createdAt: ASC` (fecha de creación como fallback)

4. **Optimización**: El endpoint está optimizado para manejar múltiples imágenes en una sola operación.

## Integración con el frontend

Para implementar drag & drop en el frontend:

1. Obtén las imágenes del vehículo
2. Permite al usuario arrastrar y reordenar
3. Calcula los nuevos `sortOrder` (ej: 1, 2, 3, ...)
4. Envía la actualización con este endpoint
5. Actualiza la UI con las imágenes ordenadas devueltas
