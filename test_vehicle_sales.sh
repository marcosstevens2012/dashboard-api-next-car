#!/bin/bash

# Script para probar el API de ventas de vehículos
API_BASE_URL="http://localhost:3001"

echo "🚗 Probando API de Ventas de Vehículos"
echo "======================================="

# Test 1: Crear una nueva venta de vehículo
echo "📝 Test 1: Creando nueva venta de vehículo..."
RESPONSE=$(curl -s -X POST "$API_BASE_URL/vehicle-sales" \
  -H "Content-Type: application/json" \
  -d '{
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
  }')

echo "Respuesta: $RESPONSE"
echo ""

# Extraer ID de la respuesta para usar en otros tests
SALE_ID=$(echo $RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -n "$SALE_ID" ]; then
    echo "✅ Venta creada con ID: $SALE_ID"
    
    # Test 2: Obtener todas las ventas
    echo "📋 Test 2: Obteniendo todas las ventas..."
    curl -s -X GET "$API_BASE_URL/vehicle-sales" | jq .
    echo ""
    
    # Test 3: Obtener una venta específica
    echo "🔍 Test 3: Obteniendo venta específica..."
    curl -s -X GET "$API_BASE_URL/vehicle-sales/$SALE_ID" | jq .
    echo ""
    
    # Test 4: Marcar como procesada
    echo "✅ Test 4: Marcando venta como procesada..."
    curl -s -X PATCH "$API_BASE_URL/vehicle-sales/$SALE_ID/process" | jq .
    echo ""
    
    # Test 5: Verificar que fue marcada como procesada
    echo "🔍 Test 5: Verificando estado procesado..."
    curl -s -X GET "$API_BASE_URL/vehicle-sales/$SALE_ID" | jq .
    echo ""
    
else
    echo "❌ Error: No se pudo crear la venta"
fi

echo "🏁 Tests completados!"
