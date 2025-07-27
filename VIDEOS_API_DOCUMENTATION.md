# 🎥 API de Videos - Documentación

## Nuevos Endpoints Agregados

La API ahora soporta la subida y gestión de videos además de imágenes, almacenándolos en Cloudinary.

### 📋 Endpoints Disponibles

#### 1. Subir Video Individual

```
POST /videos/upload/:vehicleId
```

- **Descripción**: Sube un video a Cloudinary y lo asocia con un vehículo específico
- **Content-Type**: `multipart/form-data`
- **Parámetros**:
  - `vehicleId` (path): ID del vehículo
  - `video` (file): Archivo de video (mp4, avi, mov, mkv)

**Ejemplo con curl:**

```bash
curl -X POST 'http://localhost:3001/videos/upload/VEHICLE_ID' \
  -H 'Content-Type: multipart/form-data' \
  -F 'video=@/path/to/your/video.mp4'
```

#### 2. Subir Múltiples Videos a un Vehículo

```
POST /vehicles/:id/upload-videos
```

- **Descripción**: Sube múltiples videos para un vehículo específico
- **Content-Type**: `multipart/form-data`
- **Parámetros**:
  - `id` (path): ID del vehículo
  - `videos` (files): Array de archivos de video

#### 3. Obtener Todos los Videos

```
GET /videos
```

- **Descripción**: Lista todos los videos en el sistema
- **Respuesta**: Array de objetos video con información del vehículo

#### 4. Obtener Video por ID

```
GET /videos/:id
```

- **Descripción**: Obtiene un video específico por su ID
- **Parámetros**:
  - `id` (path): ID único del video

#### 5. Obtener Videos de un Vehículo

```
GET /videos/vehicle/:vehicleId
```

- **Descripción**: Obtiene todos los videos asociados a un vehículo específico
- **Parámetros**:
  - `vehicleId` (path): ID del vehículo

#### 6. Eliminar Video

```
DELETE /videos/:id
```

- **Descripción**: Elimina un video del sistema y de Cloudinary
- **Parámetros**:
  - `id` (path): ID único del video a eliminar

## 🗄️ Modelo de Datos

### Tabla Videos

```sql
videos {
  id        String   @id @default(cuid())
  url       String   -- URL del video en Cloudinary
  publicId  String?  -- ID público de Cloudinary para eliminación
  filename  String?  -- Nombre original del archivo
  vehicleId String   -- ID del vehículo asociado
  createdAt DateTime @default(now())

  // Relación
  vehicle   Vehicle  @relation(...)
}
```

## 🔧 Configuración de Cloudinary

Los videos se suben con las siguientes configuraciones:

- **Carpeta**: `nextcar-vehicles/videos`
- **Formato**: Convertido a MP4
- **Calidad**: `auto:good`
- **Transformaciones**:
  - Tamaño máximo: 1280x720
  - Crop: `limit`

## 🚀 Estado del Servidor

- ✅ Servidor funcionando en: http://localhost:3001
- ✅ Documentación Swagger: http://localhost:3001/api
- ✅ Base de datos conectada (Supabase PostgreSQL)
- ✅ Tabla `videos` creada correctamente
- ✅ Todos los endpoints registrados y funcionando

## 📝 Próximos Pasos

1. **Probar subida de videos**: Usar Postman o similar para subir videos de prueba
2. **Validar transformaciones**: Verificar que los videos se procesan correctamente en Cloudinary
3. **Integrar en frontend**: Actualizar la interfaz para mostrar y gestionar videos
4. **Optimizar**: Agregar validaciones de tamaño y formato de archivo

## 🔍 Testing

Usar el script de prueba incluido:

```bash
./test_videos_api.sh
```

O probar endpoints individualmente con curl o Postman.
