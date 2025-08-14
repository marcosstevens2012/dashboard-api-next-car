#!/bin/bash

# Script para probar el endpoint de ordenamiento de imágenes
# Asegúrate de que el servidor esté ejecutándose antes de usar este script

BASE_URL="http://localhost:3000"

echo "🔍 Probando endpoint de ordenamiento de imágenes..."
echo ""

# Primero, obtener algunas imágenes para usar en la prueba
echo "📋 Obteniendo lista de imágenes disponibles..."
curl -X GET "$BASE_URL/images" \
  -H "Content-Type: application/json" | jq '.[0:3] | map({id: .id, vehicleId: .vehicleId, sortOrder: .sortOrder // 0})'

echo ""
echo ""

# Ejemplo de reordenamiento de imágenes
echo "🔄 Actualizando orden de imágenes..."
echo "Enviando solicitud de reordenamiento..."

# Reemplaza estos IDs con IDs reales de tu base de datos
curl -X PATCH "$BASE_URL/images/order" \
  -H "Content-Type: application/json" \
  -d '{
    "images": [
      {
        "id": "imagen-id-1",
        "sortOrder": 1
      },
      {
        "id": "imagen-id-2", 
        "sortOrder": 2
      },
      {
        "id": "imagen-id-3",
        "sortOrder": 3
      }
    ]
  }' | jq '.'

echo ""
echo "✅ Prueba completada. Verifica que el orden se haya actualizado correctamente."

# Ejemplo de consulta para obtener imágenes de un vehículo ordenadas
echo ""
echo "📋 Para obtener imágenes de un vehículo específico ordenadas, usa:"
echo "GET $BASE_URL/vehicles/{vehicleId}/images"

# Nota: Este endpoint debería estar implementado en el controlador de vehículos
# para obtener las imágenes ordenadas por sortOrder
