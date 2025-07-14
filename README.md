# Dashboard API - Sistema de Administración de Vehículos

Una API REST construida con NestJS para administrar vehículos y contactos, con características técnicas completas y funcionalidades de gestión de imágenes.

## Características Principales

### 🚗 Gestión Completa de Vehículos

- **Información básica**: Nombre, marca, modelo, año, precio, descripción
- **Especificaciones del motor**: Combustible, cilindrada, potencia, alimentación, cilindros, válvulas
- **Transmisión y chasis**: Tracción, transmisión, velocidades, neumáticos, frenos, dirección asistida
- **Equipamiento de confort**: Aire acondicionado, asientos, volante, tapizados, vidrios, espejos, faros antiniebla, computadora de bordo, llantas de aleación, cámara de estacionamiento
- **Equipamiento de seguridad**: ABS, distribución electrónica de frenado, airbags, alarma, inmovilizador, control de estabilidad, control de tracción
- **Comunicación y entretenimiento**: Equipo de música, comandos en volante, conexiones USB/Auxiliar, Bluetooth, pantalla, GPS, Apple CarPlay, MirrorLink

### 📸 Gestión de Imágenes

- Subida de múltiples imágenes por vehículo
- Integración con Multer para manejo de archivos
- Endpoints para visualizar y eliminar imágenes

### 📧 Gestión de Contactos

- Recepción y administración de consultas de clientes
- Información completa de contacto y mensajes

### 📚 Documentación Automática

- Documentación completa con Swagger en `/api`
- Validación de datos con DTOs
- Ejemplos de uso incluidos

## Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **Prisma** - ORM para base de datos
- **SQLite** - Base de datos (desarrollo)
- **Multer** - Manejo de archivos
- **class-validator** - Validación de DTOs
- **Swagger** - Documentación de API
- **TypeScript** - Tipado estático

## Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd dashboard-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración

# Inicializar la base de datos
npm run db:migrate
npm run db:seed

# Iniciar el servidor
npm run start:dev
```

## Estructura del Proyecto

```
src/
├── vehicles/           # Módulo de vehículos
│   ├── dto/           # DTOs para validación
│   ├── vehicles.controller.ts
│   ├── vehicles.service.ts
│   └── vehicles.module.ts
├── images/            # Módulo de imágenes
│   ├── dto/
│   ├── images.controller.ts
│   ├── images.service.ts
│   └── images.module.ts
├── contacts/          # Módulo de contactos
│   ├── dto/
│   ├── contacts.controller.ts
│   ├── contacts.service.ts
│   └── contacts.module.ts
├── prisma/            # Módulo de Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts
└── main.ts
```

## 📚 Documentación de la API

### 🌐 Endpoints Públicos (Sin autenticación)

- `GET /public/vehicles` - Lista vehículos con paginación y filtros avanzados
- `GET /public/vehicles/featured` - Obtiene solo vehículos destacados
- `GET /public/vehicles/filter-options` - Opciones disponibles para filtros
- `GET /public/vehicles/:id` - Obtiene un vehículo específico con todos los detalles
- `POST /public/contacts` - Crea una consulta de contacto (rate limited)

### 🔐 Autenticación

- `POST /auth/login` - Autentica usuario y devuelve JWT token

### 🚗 Gestión de Vehículos

- `GET /vehicles` - Lista todos los vehículos con filtros
- `GET /vehicles/featured` - Vehículos destacados
- `GET /vehicles/stats` - Estadísticas completas de vehículos
- `GET /vehicles/filter-options` - Opciones para filtros dinámicos
- `GET /vehicles/:id` - Obtiene un vehículo específico
- `POST /vehicles` - Crea un nuevo vehículo (50+ campos disponibles)
- `PATCH /vehicles/:id` - Actualiza un vehículo
- `DELETE /vehicles/:id` - Elimina un vehículo
- `PATCH /vehicles/:id/highlight` - Marca/desmarca como destacado
- `POST /vehicles/:id/images` - Sube múltiples imágenes (hasta 10, 5MB c/u)

### 🖼️ Gestión de Imágenes

- `GET /images` - Lista todas las imágenes
- `GET /images/:id` - Obtiene una imagen específica
- `DELETE /images/:id` - Elimina una imagen

### 📞 Gestión de Contactos

- `GET /contacts` - Lista todos los contactos
- `GET /contacts/:id` - Obtiene un contacto específico
- `POST /contacts` - Crea un nuevo contacto
- `DELETE /contacts/:id` - Elimina un contacto

### 🔒 Dashboard Administrativo (Requiere JWT)

- `GET /dashboard/stats` - Estadísticas para el dashboard
- `GET /dashboard/vehicles` - Gestión completa de vehículos
- `GET /dashboard/contacts` - Gestión de consultas de clientes
- `GET /dashboard/images` - Gestión de imágenes
- Endpoints CRUD completos con autenticación JWT

> **📖 Documentación Completa**: Ver `API_DOCUMENTATION.md` para detalles exhaustivos de todos los endpoints, parámetros, respuestas y ejemplos de uso.

## Características Técnicas del Modelo de Vehículo

El modelo de vehículo incluye más de 50 campos organizados en categorías:

### Motor y Rendimiento

- Tipo de combustible, cilindrada, potencia
- Alimentación, número de cilindros y válvulas

### Transmisión

- Tipo de tracción (4X2, 4X4)
- Transmisión (Manual, Automática, CVT)
- Especificaciones de velocidades

### Equipamiento de Confort

- Aire acondicionado, asientos ajustables
- Volante regulable, tapizados
- Vidrios y espejos eléctricos
- Faros antiniebla, computadora de bordo
- Llantas de aleación, cámara de estacionamiento

### Seguridad

- ABS, control de estabilidad
- Múltiples tipos de airbags
- Alarma, inmovilizador
- Asistencia de frenado de emergencia

### Entretenimiento

- Equipo de música completo
- Conectividad Bluetooth, USB
- Pantalla, GPS
- Apple CarPlay, MirrorLink

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev      # Modo desarrollo con recarga automática
npm run start:debug    # Modo debug

# Producción
npm run build          # Construir para producción
npm run start:prod     # Iniciar en producción

# Base de datos
npm run db:migrate     # Ejecutar migraciones
npm run db:seed        # Poblar con datos de prueba
npm run db:studio      # Abrir Prisma Studio

# Testing
npm run test           # Ejecutar tests
npm run test:watch     # Tests en modo watch
npm run test:cov       # Coverage de tests
```

## Documentación de la API

La documentación completa está disponible en:

- **Swagger UI**: http://localhost:3001/api
- **Ejemplos detallados**: Ver `VEHICLE_EXAMPLES.md`
- **Archivo de ejemplos**: Ver `EXAMPLES.md`

## Configuración de Desarrollo

### Variables de Entorno

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# Puerto del servidor
PORT=3001

# Configuración de archivos
UPLOAD_DIR="./uploads"
```

### Docker (Opcional)

```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d

# Cambiar a PostgreSQL en .env
DATABASE_URL="postgresql://dashboard:password@localhost:5432/dashboard_db"
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo `LICENSE` para más detalles.

## Soporte

Para preguntas o problemas:

- Abre un issue en el repositorio
- Revisa la documentación en `/api`
- Consulta los ejemplos en `VEHICLE_EXAMPLES.md`
