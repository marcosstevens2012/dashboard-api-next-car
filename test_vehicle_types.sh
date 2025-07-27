#!/bin/bash

# Script para probar la nueva funcionalidad de tipos de vehículos

echo "🧪 Probando funcionalidad de tipos de vehículos..."
echo "======================================================"

BASE_URL="http://localhost:3001"

echo ""
echo "1. Obteniendo opciones de filtro (incluyendo tipos):"
echo "GET $BASE_URL/vehicles/filter-options"
curl -s "$BASE_URL/vehicles/filter-options" | jq '.'

echo ""
echo "2. Obteniendo estadísticas (incluyendo por tipo):"
echo "GET $BASE_URL/vehicles/stats"
curl -s "$BASE_URL/vehicles/stats" | jq '.'

echo ""
echo "3. Filtrando solo motos:"
echo "GET $BASE_URL/vehicles?tipo=moto"
curl -s "$BASE_URL/vehicles?tipo=moto" | jq '.data[] | {nombre, marca, tipo}'

echo ""
echo "4. Filtrando solo SUVs:"
echo "GET $BASE_URL/vehicles?tipo=suv"
curl -s "$BASE_URL/vehicles?tipo=suv" | jq '.data[] | {nombre, marca, tipo}'

echo ""
echo "5. Ordenando por tipo:"
echo "GET $BASE_URL/vehicles?sortBy=tipo&sortOrder=asc"
curl -s "$BASE_URL/vehicles?sortBy=tipo&sortOrder=asc" | jq '.data[] | {nombre, tipo}'

echo ""
echo "✅ Pruebas completadas!"
