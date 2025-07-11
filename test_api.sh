#!/bin/bash

# Script para probar las nuevas características de la API

echo "🚗 Probando API de Dashboard - Características Técnicas Completas"
echo "================================================================"

API_URL="http://localhost:3001"

# Función para hacer peticiones con formato JSON
make_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    echo "📡 $method $endpoint"
    if [ -n "$data" ]; then
        curl -s -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" | jq '.' 2>/dev/null || echo "Error en la petición"
    else
        curl -s -X $method "$API_URL$endpoint" | jq '.' 2>/dev/null || echo "Error en la petición"
    fi
    echo ""
}

# Verificar que el servidor esté corriendo
echo "🔍 Verificando servidor..."
if ! curl -s "$API_URL" > /dev/null; then
    echo "❌ El servidor no está corriendo en $API_URL"
    echo "Ejecuta: npm start"
    exit 1
fi
echo "✅ Servidor corriendo"
echo ""

# Obtener todos los vehículos
echo "1. Obtener todos los vehículos"
make_request "GET" "/vehicles"

# Obtener un vehículo específico
echo "2. Obtener el primer vehículo con todas sus características"
VEHICLE_ID=$(curl -s "$API_URL/vehicles" | jq -r '.[0].id' 2>/dev/null)
if [ "$VEHICLE_ID" != "null" ] && [ -n "$VEHICLE_ID" ]; then
    make_request "GET" "/vehicles/$VEHICLE_ID"
else
    echo "❌ No se encontraron vehículos"
fi

# Crear un vehículo de prueba con características completas
echo "3. Crear un vehículo de prueba con características técnicas completas"
VEHICLE_DATA='{
    "nombre": "Test Vehicle XLE",
    "marca": "Toyota",
    "modelo": "Test Model",
    "anio": 2024,
    "precio": 40000,
    "descripcion": "Vehículo de prueba con todas las características técnicas",
    "destacado": true,
    "kilometraje": "1000",
    "observaciones": "Vehículo de prueba para la API",
    "combustible": "Híbrido",
    "cilindrada": "2.5",
    "potencia": "200 CV",
    "alimentacion": "Inyección Directa + Motor Eléctrico",
    "cilindros": 4,
    "valvulas": 16,
    "traccion": "4X4",
    "transmision": "CVT",
    "velocidades": "CVT con modo manual",
    "neumaticos": "R19",
    "frenosDelanteros": "Discos ventilados",
    "frenosTraseros": "Discos sólidos",
    "direccionAsistida": true,
    "direccionAsistidaTipo": "Eléctrica",
    "aireAcondicionado": true,
    "asientoDelanteroAjuste": true,
    "volanteRegulable": true,
    "asientosTraseros": "Abatibles y calefaccionados",
    "tapizados": "Cuero Premium",
    "cierrePuertas": "Centralizado inteligente",
    "vidriosDelanteros": "Eléctricos con auto-subida",
    "vidriosTraseros": "Eléctricos con control parental",
    "espejosExteriores": "Eléctricos con memoria",
    "farosAntiniebla": true,
    "computadoraBordo": true,
    "llantasAleacion": true,
    "camaraEstacionamiento": true,
    "asistenciaArranquePendientes": true,
    "controlEconomiaCombustible": true,
    "luzDiurna": true,
    "abs": true,
    "distribucionElectronicaFrenado": true,
    "asistenciaFrenadaEmergencia": true,
    "airbagsDelanteros": true,
    "airbagsCortina": "Delanteros, traseros y laterales",
    "airbagRodillaConductor": true,
    "airbagsLaterales": "Completos",
    "alarma": true,
    "inmovilizadorMotor": true,
    "anclajeAsientosInfantiles": true,
    "autobloqueoPuertas": true,
    "controlEstabilidad": true,
    "controlTraccion": true,
    "cantidadAirbags": 12,
    "equipoMusica": "Sistema premium JBL",
    "comandosVolante": true,
    "conexionAuxiliar": true,
    "conexionUSB": true,
    "interfazBluetooth": true,
    "controlVozDispositivos": true,
    "pantalla": true,
    "sistemaNavegacionGPS": true,
    "appleCarPlay": true,
    "mirrorlink": true
}'

NEW_VEHICLE_ID=$(curl -s -X POST "$API_URL/vehicles" \
    -H "Content-Type: application/json" \
    -d "$VEHICLE_DATA" | jq -r '.id' 2>/dev/null)

if [ "$NEW_VEHICLE_ID" != "null" ] && [ -n "$NEW_VEHICLE_ID" ]; then
    echo "✅ Vehículo creado con ID: $NEW_VEHICLE_ID"
else
    echo "❌ Error al crear el vehículo"
fi

# Actualizar el vehículo
echo "4. Actualizar características del vehículo"
if [ "$NEW_VEHICLE_ID" != "null" ] && [ -n "$NEW_VEHICLE_ID" ]; then
    UPDATE_DATA='{
        "precio": 42000,
        "kilometraje": "1500",
        "observaciones": "Actualizado con nuevas características",
        "sistemaNavegacionGPS": false,
        "cantidadAirbags": 10
    }'
    
    make_request "PATCH" "/vehicles/$NEW_VEHICLE_ID" "$UPDATE_DATA"
fi

# Obtener contactos
echo "5. Obtener contactos"
make_request "GET" "/contacts"

# Obtener imágenes
echo "6. Obtener imágenes"
make_request "GET" "/images"

echo "🎉 Pruebas completadas!"
echo ""
echo "📖 Para más información consulta:"
echo "   - Documentación Swagger: $API_URL/api"
echo "   - Ejemplos detallados: ./VEHICLE_EXAMPLES.md"
echo "   - README completo: ./README.md"
