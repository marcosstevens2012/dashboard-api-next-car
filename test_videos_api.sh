#!/bin/bash

# Script para probar los endpoints de videos

API_BASE="http://localhost:3001"

echo "🧪 Probando endpoints de videos..."
echo ""

# 1. Obtener todos los videos
echo "1. GET /videos - Obtener todos los videos"
curl -X GET "$API_BASE/videos" \
  -H "Content-Type: application/json" \
  | jq '.' || echo "Error o no hay datos"

echo ""
echo ""

# 2. Verificar documentación de Swagger
echo "2. Verificar documentación disponible en:"
echo "   📚 Swagger: $API_BASE/api"
echo ""

# 3. Obtener opciones de filtro para verificar que la API funciona
echo "3. GET /public/vehicles/filter-options - Verificar API funcionando"
curl -X GET "$API_BASE/public/vehicles/filter-options" \
  -H "Content-Type: application/json" \
  | jq '.' || echo "Error en la API"

echo ""
echo ""
echo "✅ Scripts de prueba completados"
echo "📝 Para probar subida de videos, usa un cliente como Postman o curl con archivos"
echo ""
echo "Ejemplo de subida de video:"
echo "curl -X POST '$API_BASE/videos/upload/VEHICLE_ID' \\"
echo "  -H 'Content-Type: multipart/form-data' \\"
echo "  -F 'video=@/path/to/your/video.mp4'"
