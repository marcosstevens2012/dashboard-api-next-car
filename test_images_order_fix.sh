#!/bin/bash

# Script de prueba para verificar el ordenamiento de imágenes
# Compara endpoints públicos vs privados

BASE_URL="http://localhost:3000"

echo "🔍 Probando ordenamiento de imágenes en endpoints públicos y privados"
echo "================================================="

# Obtener todos los vehículos públicos para elegir uno
echo "📋 Obteniendo vehículos públicos..."
PUBLIC_VEHICLES=$(curl -s "$BASE_URL/public/vehicles?limit=1" | jq -r '.data[0].id // empty')

if [ -z "$PUBLIC_VEHICLES" ]; then
    echo "❌ No se encontraron vehículos públicos"
    exit 1
fi

VEHICLE_ID=$PUBLIC_VEHICLES
echo "✅ Usando vehículo ID: $VEHICLE_ID"

echo ""
echo "🌐 ENDPOINT PÚBLICO - Detalle de vehículo:"
echo "GET $BASE_URL/public/vehicles/$VEHICLE_ID"
echo "----------------------------------------"

PUBLIC_RESPONSE=$(curl -s "$BASE_URL/public/vehicles/$VEHICLE_ID")
echo "$PUBLIC_RESPONSE" | jq '.images[] | {id: .id, sortOrder: .sortOrder, isPrincipal: .isPrincipal, url: .url}' 2>/dev/null || echo "Sin imágenes o error en respuesta"

echo ""
echo "🔒 ENDPOINT PRIVADO - Detalle de vehículo (requiere auth):"
echo "GET $BASE_URL/vehicles/$VEHICLE_ID"
echo "----------------------------------------"

# Nota: Este endpoint requiere autenticación, mostramos solo la URL
echo "⚠️  Este endpoint requiere JWT token"
echo "Para probar manualmente:"
echo "curl -H 'Authorization: Bearer YOUR_TOKEN' $BASE_URL/vehicles/$VEHICLE_ID"

echo ""
echo "🔧 VERIFICACIÓN DE ORDENAMIENTO:"
echo "Las imágenes deben aparecer en este orden:"
echo "1. isPrincipal: true (imagen principal primero)"
echo "2. sortOrder: ASC (orden personalizado)"
echo "3. createdAt: ASC (fecha de creación como fallback)"

echo ""
echo "🎯 ENDPOINT DE IMÁGENES ESPECÍFICO:"
echo "GET $BASE_URL/vehicles/$VEHICLE_ID/images"
echo "----------------------------------------"

IMAGES_RESPONSE=$(curl -s "$BASE_URL/vehicles/$VEHICLE_ID/images")
echo "$IMAGES_RESPONSE" | jq '.[] | {id: .id, sortOrder: .sortOrder, isPrincipal: .isPrincipal, filename: .filename}' 2>/dev/null || echo "Sin imágenes o error en respuesta"

echo ""
echo "✅ Prueba completada. Verifica que el orden sea consistente entre endpoints."
