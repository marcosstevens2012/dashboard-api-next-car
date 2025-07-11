# Ejemplos de Vehículos con Características Completas

## Estructura del Modelo de Vehículo

El modelo de vehículo ahora incluye todas las características técnicas y de equipamiento:

### Campos Básicos

- `nombre`: Nombre del vehículo
- `marca`: Marca del vehículo
- `modelo`: Modelo del vehículo
- `anio`: Año de fabricación
- `precio`: Precio en dólares
- `descripcion`: Descripción del vehículo
- `destacado`: Si está destacado (boolean)
- `kilometraje`: Kilometraje del vehículo
- `observaciones`: Observaciones adicionales

### Especificaciones del Motor

- `combustible`: Tipo de combustible (Nafta, Diesel, Híbrido, Eléctrico)
- `cilindrada`: Cilindrada del motor (ej: "2.0")
- `potencia`: Potencia del motor (ej: "150 CV")
- `alimentacion`: Tipo de alimentación (ej: "Inyección Electrónica")
- `cilindros`: Número de cilindros
- `valvulas`: Número de válvulas

### Transmisión y Chasis

- `traccion`: Tipo de tracción (4X2, 4X4)
- `transmision`: Tipo de transmisión (Manual, Automática, CVT)
- `velocidades`: Descripción de la caja de velocidades
- `neumaticos`: Tipo de neumáticos (ej: "R17")
- `frenosDelanteros`: Tipo de frenos delanteros
- `frenosTraseros`: Tipo de frenos traseros
- `direccionAsistida`: Si tiene dirección asistida (boolean)
- `direccionAsistidaTipo`: Tipo de dirección asistida (Hidráulica, Eléctrica)

### Equipamiento de Confort

- `aireAcondicionado`: Si tiene aire acondicionado (boolean)
- `asientoDelanteroAjuste`: Si tiene ajuste de asientos delanteros (boolean)
- `volanteRegulable`: Si tiene volante regulable (boolean)
- `asientosTraseros`: Descripción de asientos traseros
- `tapizados`: Tipo de tapizados (Tela, Cuero)
- `cierrePuertas`: Tipo de cierre de puertas
- `vidriosDelanteros`: Tipo de vidrios delanteros
- `vidriosTraseros`: Tipo de vidrios traseros
- `espejosExteriores`: Tipo de espejos exteriores
- `farosAntiniebla`: Si tiene faros antiniebla (boolean)
- `computadoraBordo`: Si tiene computadora de bordo (boolean)
- `llantasAleacion`: Si tiene llantas de aleación (boolean)
- `camaraEstacionamiento`: Si tiene cámara de estacionamiento (boolean)
- `asistenciaArranquePendientes`: Si tiene asistencia de arranque en pendientes (boolean)
- `controlEconomiaCombustible`: Si tiene control de economía de combustible (boolean)
- `luzDiurna`: Si tiene luz diurna (boolean)

### Equipamiento de Seguridad

- `abs`: Si tiene ABS (boolean)
- `distribucionElectronicaFrenado`: Si tiene distribución electrónica de frenado (boolean)
- `asistenciaFrenadaEmergencia`: Si tiene asistencia de frenada de emergencia (boolean)
- `airbagsDelanteros`: Si tiene airbags delanteros (boolean)
- `airbagsCortina`: Descripción de airbags cortina
- `airbagRodillaConductor`: Si tiene airbag de rodilla del conductor (boolean)
- `airbagsLaterales`: Descripción de airbags laterales
- `alarma`: Si tiene alarma (boolean)
- `inmovilizadorMotor`: Si tiene inmovilizador del motor (boolean)
- `anclajeAsientosInfantiles`: Si tiene anclaje para asientos infantiles (boolean)
- `autobloqueoPuertas`: Si tiene autobloqueo de puertas (boolean)
- `controlEstabilidad`: Si tiene control de estabilidad (boolean)
- `controlTraccion`: Si tiene control de tracción (boolean)
- `cantidadAirbags`: Cantidad total de airbags

### Comunicación y Entretenimiento

- `equipoMusica`: Tipo de equipo de música
- `comandosVolante`: Si tiene comandos en el volante (boolean)
- `conexionAuxiliar`: Si tiene conexión auxiliar (boolean)
- `conexionUSB`: Si tiene conexión USB (boolean)
- `interfazBluetooth`: Si tiene interfaz Bluetooth (boolean)
- `controlVozDispositivos`: Si tiene control de voz de dispositivos (boolean)
- `pantalla`: Si tiene pantalla (boolean)
- `sistemaNavegacionGPS`: Si tiene sistema de navegación GPS (boolean)
- `appleCarPlay`: Si tiene Apple CarPlay (boolean)
- `mirrorlink`: Si tiene MirrorLink (boolean)

## Ejemplo de Creación de Vehículo

```bash
curl -X POST http://localhost:3001/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Camry XLE",
    "marca": "Toyota",
    "modelo": "Camry",
    "anio": 2024,
    "precio": 35000,
    "descripcion": "Sedán premium con tecnología avanzada",
    "destacado": true,
    "kilometraje": "5000",
    "combustible": "Nafta",
    "cilindrada": "2.5",
    "potencia": "203 CV",
    "alimentacion": "Inyección Directa",
    "cilindros": 4,
    "valvulas": 16,
    "traccion": "4X2",
    "transmision": "Automática",
    "velocidades": "Automática de 8 velocidades",
    "neumaticos": "R18",
    "frenosDelanteros": "Discos ventilados",
    "frenosTraseros": "Discos sólidos",
    "direccionAsistida": true,
    "direccionAsistidaTipo": "Eléctrica",
    "aireAcondicionado": true,
    "asientoDelanteroAjuste": true,
    "volanteRegulable": true,
    "tapizados": "Cuero",
    "cierrePuertas": "Centralizado con mando a distancia",
    "vidriosDelanteros": "Eléctricos",
    "vidriosTraseros": "Eléctricos",
    "espejosExteriores": "Eléctricos",
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
    "alarma": true,
    "inmovilizadorMotor": true,
    "anclajeAsientosInfantiles": true,
    "autobloqueoPuertas": true,
    "controlEstabilidad": true,
    "controlTraccion": true,
    "cantidadAirbags": 10,
    "equipoMusica": "AM-FM-CD-MP3-USB-Bluetooth",
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
```

## Ejemplo de Actualización de Vehículo

```bash
curl -X PATCH http://localhost:3001/vehicles/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 33000,
    "kilometraje": "7500",
    "observaciones": "Servicio recién realizado",
    "camaraEstacionamiento": false,
    "cantidadAirbags": 8
  }'
```

## Consulta de Vehículos

```bash
# Obtener todos los vehículos
curl http://localhost:3001/vehicles

# Obtener un vehículo específico
curl http://localhost:3001/vehicles/{id}

# Destacar un vehículo
curl -X PATCH http://localhost:3001/vehicles/{id}/highlight \
  -H "Content-Type: application/json" \
  -d '{"destacado": true}'
```

## Endpoints Disponibles

- `GET /vehicles` - Obtener todos los vehículos
- `GET /vehicles/:id` - Obtener un vehículo específico
- `POST /vehicles` - Crear un nuevo vehículo
- `PATCH /vehicles/:id` - Actualizar un vehículo
- `DELETE /vehicles/:id` - Eliminar un vehículo
- `PATCH /vehicles/:id/highlight` - Destacar/quitar destacado de un vehículo
- `POST /vehicles/:id/images` - Subir imágenes a un vehículo

## Documentación Swagger

La documentación completa de la API está disponible en:
http://localhost:3001/api

Allí podrás ver todos los campos disponibles, probar los endpoints directamente, y ver ejemplos de uso.
