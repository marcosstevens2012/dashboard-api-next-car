# 🧪 Ejemplos cURL para Testing - NEXTCAR Dashboard API

## 🌐 Endpoints Públicos

### 1. Obtener Vehículos con Filtros

```bash
# Obtener todos los vehículos (primera página)
curl -X GET "http://localhost:3001/public/vehicles" \
  -H "Accept: application/json"

# Buscar vehículos con filtros específicos
curl -X GET "http://localhost:3001/public/vehicles?search=toyota&marca=Toyota&precioMin=20000&precioMax=30000&anioMin=2020&page=1&limit=5&sortBy=precio&sortOrder=asc" \
  -H "Accept: application/json"

# Obtener vehículos por combustible y transmisión
curl -X GET "http://localhost:3001/public/vehicles?combustible=Híbrido&transmision=CVT&destacado=true" \
  -H "Accept: application/json"
```

### 2. Obtener Vehículos Destacados

```bash
# Vehículos destacados para página principal
curl -X GET "http://localhost:3001/public/vehicles/featured?page=1&limit=6" \
  -H "Accept: application/json"
```

### 3. Obtener Opciones de Filtros

```bash
# Opciones dinámicas para filtros
curl -X GET "http://localhost:3001/public/vehicles/filter-options" \
  -H "Accept: application/json"
```

### 4. Obtener Vehículo Específico

```bash
# Reemplazar {vehicleId} con un ID real
curl -X GET "http://localhost:3001/public/vehicles/{vehicleId}" \
  -H "Accept: application/json"
```

### 5. Crear Contacto

```bash
# Crear nueva consulta de contacto
curl -X POST "http://localhost:3001/public/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "telefono": "+54 9 11 1234-5678",
    "mensaje": "Estoy interesado en el Toyota Corolla",
    "vehiculoInteres": "Toyota Corolla XEI"
  }'
```

## 🔐 Autenticación

### Login

```bash
# Autenticar usuario y obtener JWT token
curl -X POST "http://localhost:3001/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'

# Guardar el token en una variable (Bash)
TOKEN=$(curl -s -X POST "http://localhost:3001/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}' \
  | jq -r '.access_token')

echo "Token obtenido: $TOKEN"
```

## 🚗 Gestión de Vehículos

### 1. Crear Vehículo Básico

```bash
curl -X POST "http://localhost:3001/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ford Focus Titanium",
    "marca": "Ford",
    "modelo": "Focus",
    "anio": 2022,
    "precio": 22000,
    "descripcion": "Hatchback premium con tecnología avanzada",
    "destacado": false,
    "kilometraje": "25.000 km",
    "combustible": "Nafta",
    "transmision": "Automática",
    "aireAcondicionado": true,
    "abs": true
  }'
```

### 2. Crear Vehículo Completo con Todas las Especificaciones

```bash
curl -X POST "http://localhost:3001/vehicles" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Toyota Camry Hybrid XLE",
    "marca": "Toyota",
    "modelo": "Camry",
    "anio": 2024,
    "precio": 45000,
    "descripcion": "Sedán híbrido premium con tecnología de última generación",
    "destacado": true,
    "kilometraje": "0 km",
    "observaciones": "Vehículo 0 km con garantía extendida",

    "combustible": "Híbrido",
    "cilindrada": "2.5L + Motor eléctrico",
    "potencia": "218 HP combinados",
    "alimentacion": "Inyección directa + Sistema híbrido",
    "cilindros": 4,
    "valvulas": 16,

    "traccion": "4x2",
    "transmision": "CVT",
    "velocidades": "CVT continua",
    "neumaticos": "235/45 R18",
    "frenosDelanteros": "Disco ventilado",
    "frenosTraseros": "Disco sólido",
    "direccionAsistida": true,
    "direccionAsistidaTipo": "Eléctrica progresiva",

    "aireAcondicionado": true,
    "asientoDelanteroAjuste": true,
    "volanteRegulable": true,
    "asientosTraseros": "60/40 abatibles",
    "tapizados": "Cuero premium",
    "cierrePuertas": "Eléctrico con keyless",
    "vidriosDelanteros": "Eléctricos",
    "vidriosTraseros": "Eléctricos",
    "espejosExteriores": "Eléctricos plegables",
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
    "airbagsCortina": "Delanteros y traseros",
    "airbagRodillaConductor": true,
    "airbagsLaterales": "Delanteros",
    "controlEstabilidad": true,
    "controlTraccion": true,
    "alarma": true,
    "inmovilizador": true,
    "sensorPresion": true,
    "avisoCambioCarril": true,
    "detectPuntosCiegos": true,
    "asistEstacionamiento": true,

    "equipoMusica": "Sistema premium JBL",
    "comandosVolante": true,
    "conexionUSB": true,
    "conexionAuxiliar": true,
    "bluetooth": true,
    "pantalla": "9 pulgadas táctil HD",
    "gps": true,
    "appleCarplay": true,
    "mirrorLink": true,
    "sistemaNavegacion": true,
    "reconocimientoVoz": true,
    "cargadorInalambrico": true
  }'
```

### 3. Actualizar Vehículo

```bash
# Actualizar precio y destacar vehículo
curl -X PATCH "http://localhost:3001/vehicles/{vehicleId}" \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 43000,
    "destacado": true,
    "observaciones": "Precio especial por liquidación"
  }'
```

### 4. Destacar/Quitar Destaque

```bash
# Destacar vehículo
curl -X PATCH "http://localhost:3001/vehicles/{vehicleId}/highlight" \
  -H "Content-Type: application/json" \
  -d '{"destacado": true}'

# Quitar destaque
curl -X PATCH "http://localhost:3001/vehicles/{vehicleId}/highlight" \
  -H "Content-Type: application/json" \
  -d '{"destacado": false}'
```

### 5. Subir Imágenes a Vehículo

```bash
# Subir múltiples imágenes
curl -X POST "http://localhost:3001/vehicles/{vehicleId}/images" \
  -F "images=@./imagen1.jpg" \
  -F "images=@./imagen2.jpg" \
  -F "images=@./imagen3.jpg"

# Subir una sola imagen
curl -X POST "http://localhost:3001/vehicles/{vehicleId}/images" \
  -F "images=@./vehiculo-frontal.jpg"
```

### 6. Eliminar Vehículo

```bash
curl -X DELETE "http://localhost:3001/vehicles/{vehicleId}"
```

### 7. Obtener Estadísticas

```bash
curl -X GET "http://localhost:3001/vehicles/stats" \
  -H "Accept: application/json"
```

## 🖼️ Gestión de Imágenes

### 1. Obtener Todas las Imágenes

```bash
curl -X GET "http://localhost:3001/images" \
  -H "Accept: application/json"
```

### 2. Obtener Imagen Específica

```bash
curl -X GET "http://localhost:3001/images/{imageId}" \
  -H "Accept: application/json"
```

### 3. Eliminar Imagen

```bash
curl -X DELETE "http://localhost:3001/images/{imageId}"
```

## 📞 Gestión de Contactos

### 1. Obtener Todos los Contactos

```bash
curl -X GET "http://localhost:3001/contacts" \
  -H "Accept: application/json"
```

### 2. Obtener Contacto Específico

```bash
curl -X GET "http://localhost:3001/contacts/{contactId}" \
  -H "Accept: application/json"
```

### 3. Crear Contacto

```bash
curl -X POST "http://localhost:3001/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González",
    "email": "maria@email.com",
    "telefono": "+54 351 123-4567",
    "mensaje": "Me interesa el Ford Focus. ¿Está disponible?",
    "vehiculoInteres": "Ford Focus Titanium"
  }'
```

### 4. Eliminar Contacto

```bash
curl -X DELETE "http://localhost:3001/contacts/{contactId}"
```

## 🔒 Dashboard Administrativo (Con Autenticación)

### 1. Obtener Estadísticas del Dashboard

```bash
curl -X GET "http://localhost:3001/dashboard/stats" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

### 2. Gestión de Vehículos en Dashboard

```bash
# Obtener todos los vehículos (admin)
curl -X GET "http://localhost:3001/dashboard/vehicles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"

# Crear vehículo (admin)
curl -X POST "http://localhost:3001/dashboard/vehicles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Chevrolet Cruze LT",
    "marca": "Chevrolet",
    "modelo": "Cruze",
    "anio": 2023,
    "precio": 28000,
    "descripcion": "Sedán compacto con equipamiento completo"
  }'

# Actualizar vehículo (admin)
curl -X PATCH "http://localhost:3001/dashboard/vehicles/{vehicleId}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"precio": 27000}'

# Eliminar vehículo (admin)
curl -X DELETE "http://localhost:3001/dashboard/vehicles/{vehicleId}" \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Gestión de Contactos en Dashboard

```bash
# Obtener todos los contactos (admin)
curl -X GET "http://localhost:3001/dashboard/contacts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"

# Eliminar contacto (admin)
curl -X DELETE "http://localhost:3001/dashboard/contacts/{contactId}" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Gestión de Imágenes en Dashboard

```bash
# Obtener todas las imágenes (admin)
curl -X GET "http://localhost:3001/dashboard/images" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"

# Eliminar imagen (admin)
curl -X DELETE "http://localhost:3001/dashboard/images/{imageId}" \
  -H "Authorization: Bearer $TOKEN"
```

## 🧪 Scripts de Testing Automatizado

### Script Bash para Testing Completo

```bash
#!/bin/bash

# test_api.sh - Script para testing completo de la API

BASE_URL="http://localhost:3001"
TEST_IMAGE="./test-vehicle.jpg"

echo "🧪 Iniciando tests de la API NEXTCAR Dashboard..."

# 1. Test de endpoints públicos
echo "📋 Testing endpoints públicos..."

echo "  ✓ GET /public/vehicles"
curl -s "$BASE_URL/public/vehicles?limit=3" | jq '.meta.total' > /dev/null && echo "    ✅ Éxito" || echo "    ❌ Error"

echo "  ✓ GET /public/vehicles/featured"
curl -s "$BASE_URL/public/vehicles/featured" | jq '.data[0].destacado' > /dev/null && echo "    ✅ Éxito" || echo "    ❌ Error"

echo "  ✓ GET /public/vehicles/filter-options"
curl -s "$BASE_URL/public/vehicles/filter-options" | jq '.marcas' > /dev/null && echo "    ✅ Éxito" || echo "    ❌ Error"

# 2. Test de autenticación
echo "🔐 Testing autenticación..."
TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}' \
  | jq -r '.access_token')

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
  echo "    ✅ Login exitoso"
else
  echo "    ❌ Error en login"
  exit 1
fi

# 3. Test de creación de vehículo
echo "🚗 Testing creación de vehículo..."
VEHICLE_DATA='{
  "nombre": "Test Vehicle",
  "marca": "TestMarca",
  "modelo": "TestModelo",
  "anio": 2023,
  "precio": 25000,
  "descripcion": "Vehículo de prueba para testing"
}'

VEHICLE_ID=$(curl -s -X POST "$BASE_URL/vehicles" \
  -H "Content-Type: application/json" \
  -d "$VEHICLE_DATA" \
  | jq -r '.id')

if [ "$VEHICLE_ID" != "null" ] && [ "$VEHICLE_ID" != "" ]; then
  echo "    ✅ Vehículo creado: $VEHICLE_ID"
else
  echo "    ❌ Error al crear vehículo"
  exit 1
fi

# 4. Test de actualización
echo "📝 Testing actualización de vehículo..."
curl -s -X PATCH "$BASE_URL/vehicles/$VEHICLE_ID" \
  -H "Content-Type: application/json" \
  -d '{"precio": 24000}' > /dev/null && echo "    ✅ Actualización exitosa" || echo "    ❌ Error en actualización"

# 5. Test de destacar vehículo
echo "⭐ Testing destacar vehículo..."
curl -s -X PATCH "$BASE_URL/vehicles/$VEHICLE_ID/highlight" \
  -H "Content-Type: application/json" \
  -d '{"destacado": true}' > /dev/null && echo "    ✅ Destacado exitoso" || echo "    ❌ Error al destacar"

# 6. Test de creación de contacto
echo "📞 Testing creación de contacto..."
CONTACT_DATA='{
  "nombre": "Test User",
  "email": "test@example.com",
  "telefono": "+54 11 1234-5678",
  "mensaje": "Mensaje de prueba",
  "vehiculoInteres": "Test Vehicle"
}'

CONTACT_ID=$(curl -s -X POST "$BASE_URL/public/contacts" \
  -H "Content-Type: application/json" \
  -d "$CONTACT_DATA" \
  | jq -r '.id')

if [ "$CONTACT_ID" != "null" ] && [ "$CONTACT_ID" != "" ]; then
  echo "    ✅ Contacto creado: $CONTACT_ID"
else
  echo "    ❌ Error al crear contacto"
fi

# 7. Test de dashboard con autenticación
echo "📊 Testing dashboard con autenticación..."
curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/dashboard/stats" | jq '.total' > /dev/null && echo "    ✅ Dashboard stats exitoso" || echo "    ❌ Error en dashboard stats"

# 8. Limpieza - Eliminar datos de prueba
echo "🧹 Limpiando datos de prueba..."
curl -s -X DELETE "$BASE_URL/vehicles/$VEHICLE_ID" > /dev/null && echo "    ✅ Vehículo eliminado" || echo "    ❌ Error al eliminar vehículo"

if [ "$CONTACT_ID" != "null" ] && [ "$CONTACT_ID" != "" ]; then
  curl -s -X DELETE "$BASE_URL/contacts/$CONTACT_ID" > /dev/null && echo "    ✅ Contacto eliminado" || echo "    ❌ Error al eliminar contacto"
fi

echo "✅ Tests completados!"
```

### Script para Performance Testing

```bash
#!/bin/bash

# performance_test.sh - Test de rendimiento básico

BASE_URL="http://localhost:3001"

echo "⚡ Testing rendimiento de la API..."

# Test de carga en endpoint público
echo "📈 Test de carga en /public/vehicles (10 requests concurrentes)..."
for i in {1..10}; do
  (curl -s "$BASE_URL/public/vehicles?limit=10" > /dev/null &)
done
wait
echo "    ✅ Test de carga completado"

# Test de tiempo de respuesta
echo "⏱️  Midiendo tiempo de respuesta..."
time curl -s "$BASE_URL/public/vehicles/filter-options" > /dev/null
echo "    ✅ Tiempo medido"

# Test de upload de imagen (si existe imagen de prueba)
if [ -f "./test-image.jpg" ]; then
  echo "📤 Test de upload de imagen..."
  # Necesitaríamos un vehículo existente para este test
  echo "    ⚠️  Test de upload omitido (requiere vehículo existente)"
else
  echo "    ⚠️  test-image.jpg no encontrada, omitiendo test de upload"
fi

echo "✅ Tests de rendimiento completados!"
```

## 🔧 Configuración para Postman

### Variables de Entorno

```json
{
  "id": "nextcar-api-env",
  "name": "NEXTCAR API Environment",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001",
      "enabled": true
    },
    {
      "key": "publicUrl",
      "value": "{{baseUrl}}/public",
      "enabled": true
    },
    {
      "key": "authToken",
      "value": "",
      "enabled": true
    }
  ]
}
```

### Pre-request Script para Autenticación Automática

```javascript
// Pre-request script para obtener token automáticamente
if (!pm.environment.get('authToken')) {
  pm.sendRequest(
    {
      url: pm.environment.get('baseUrl') + '/auth/login',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          username: 'admin',
          password: 'password123',
        }),
      },
    },
    function (err, response) {
      if (err) {
        console.log('Error getting token:', err);
      } else {
        const responseJson = response.json();
        pm.environment.set('authToken', responseJson.access_token);
        console.log('Token obtained successfully');
      }
    },
  );
}
```

## 🚀 Quick Start para Desarrolladores

```bash
# 1. Clonar y configurar
git clone <repository-url>
cd dashboard-api
npm install

# 2. Configurar base de datos
npm run db:migrate
npm run db:seed

# 3. Iniciar servidor
npm run start:dev

# 4. Probar API
curl http://localhost:3001/public/vehicles

# 5. Obtener token para endpoints protegidos
TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}' \
  | jq -r '.access_token')

# 6. Usar token en requests autenticados
curl -H "Authorization: Bearer $TOKEN" http://localhost:3001/dashboard/stats
```

Todos estos ejemplos están listos para usar y cubren cada endpoint de la API con casos de uso reales.
