import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactsService } from '../contacts/contacts.service';
import { UpdateImagesOrderDto } from '../images/dto/image.dto';
import { ImagesService } from '../images/images.service';
import {
  CreateVehicleDto,
  HighlightVehicleDto,
  UpdateVehicleDto,
} from '../vehicles/dto/vehicle.dto';
import { VehiclesService } from '../vehicles/vehicles.service';
import { VideosService } from '../videos/videos.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard) // Proteger todas las rutas del dashboard
export class DashboardController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly contactsService: ContactsService,
    private readonly imagesService: ImagesService,
    private readonly videosService: VideosService,
  ) {}

  // === ESTADÍSTICAS DASHBOARD ===

  @Get('stats')
  @ApiOperation({
    summary: 'Obtener estadísticas del dashboard',
    description: 'Estadísticas generales para el panel de administración',
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getDashboardStats() {
    return await this.vehiclesService.getStats();
  }

  // === GESTIÓN DE VEHÍCULOS (ADMIN) ===

  @Get('vehicles')
  @ApiOperation({
    summary: 'Obtener todos los vehículos (Admin)',
    description: 'Lista completa de vehículos para administración',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos obtenida exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getAllVehicles() {
    return await this.vehiclesService.findAll();
  }

  @Post('vehicles')
  @ApiOperation({
    summary: 'Crear nuevo vehículo (Admin)',
    description: 'Crea un nuevo vehículo en el sistema',
  })
  @ApiResponse({ status: 201, description: 'Vehículo creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Get('vehicles/:id')
  @ApiOperation({ summary: 'Obtener vehículo por ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getVehicle(@Param('id') id: string) {
    return await this.vehiclesService.findOne(id);
  }

  @Patch('vehicles/:id')
  @ApiOperation({ summary: 'Actualizar vehículo (Admin)' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({
    status: 200,
    description: 'Vehículo actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete('vehicles/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVehicle(@Param('id') id: string) {
    return await this.vehiclesService.remove(id);
  }

  @Patch('vehicles/:id/highlight')
  async highlightVehicle(
    @Param('id') id: string,
    @Body() highlightDto: HighlightVehicleDto,
  ) {
    return await this.vehiclesService.highlight(id, highlightDto.destacado);
  }

  // === GESTIÓN DE IMÁGENES ===

  @Post('vehicles/:id/images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: (req, file, cb) => {
        console.log('File filter - originalname:', file.originalname);
        console.log('File filter - mimetype:', file.mimetype);
        console.log('File filter - fieldname:', file.fieldname);

        // Verificar que el archivo tiene originalname
        if (!file.originalname) {
          return cb(new Error('File must have a valid filename!'), false);
        }

        // Verificar extensión
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return cb(
            new Error(
              `Only image files are allowed! Received: ${file.originalname}`,
            ),
            false,
          );
        }

        // Verificar MIME type como seguridad adicional
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new Error(
              `Invalid file type! Expected image, received: ${file.mimetype}`,
            ),
            false,
          );
        }

        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadImages(
    @Param('id') vehicleId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Verificar que el vehículo existe
    await this.vehiclesService.findOne(vehicleId);

    // Subir cada imagen a Cloudinary y crear registros en la base de datos
    const imagePromises = files.map((file) =>
      this.imagesService.createFromFile(file, vehicleId),
    );

    return await Promise.all(imagePromises);
  }

  @Get('images')
  async getAllImages() {
    return await this.imagesService.findAll();
  }

  @Delete('images/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('id') id: string) {
    return await this.imagesService.remove(id);
  }

  @Patch('images/:id/principal')
  @ApiOperation({
    summary: 'Marcar imagen como principal (Admin)',
    description:
      'Marca una imagen específica como la imagen principal del vehículo. Solo puede haber una imagen principal por vehículo.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la imagen a marcar como principal',
    example: '5d10950d-09b9-4452-804d-e0e7876a1db7',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen marcada como principal exitosamente.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        url: { type: 'string' },
        isPrincipal: { type: 'boolean', example: true },
        vehicleId: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async setPrincipalImage(@Param('id') id: string) {
    return await this.imagesService.setPrincipal(id);
  }

  @Patch('images/order')
  @ApiOperation({
    summary: 'Actualizar orden de imágenes (Admin)',
    description: 'Actualiza el orden de visualización de múltiples imágenes',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden de imágenes actualizado exitosamente.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          url: { type: 'string' },
          vehicleId: { type: 'string' },
          sortOrder: { type: 'number' },
          isPrincipal: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Una o más imágenes no encontradas.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateImagesOrder(@Body() updateOrderDto: UpdateImagesOrderDto) {
    return await this.imagesService.updateImagesOrder(updateOrderDto);
  }

  // === GESTIÓN DE VIDEOS ===

  @Post('vehicles/:id/videos')
  @UseInterceptors(FilesInterceptor('videos'))
  @ApiOperation({
    summary: 'Subir videos para un vehículo (Admin)',
    description:
      'Sube uno o más videos a Cloudinary para un vehículo específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del vehículo',
    example: 'clz123abc456',
  })
  @ApiResponse({ status: 201, description: 'Videos subidos exitosamente.' })
  @ApiResponse({ status: 400, description: 'Archivos inválidos.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async uploadVideos(
    @Param('id') vehicleId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Verificar que el vehículo existe
    await this.vehiclesService.findOne(vehicleId);

    // Subir cada video a Cloudinary y crear registros en la base de datos
    const videoPromises = files.map((file) =>
      this.videosService.createFromFile(file, vehicleId),
    );

    return await Promise.all(videoPromises);
  }

  @Get('videos')
  @ApiOperation({
    summary: 'Obtener todos los videos (Admin)',
    description: 'Lista todos los videos de vehículos en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de videos obtenida exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getAllVideos() {
    return await this.videosService.findAll();
  }

  @Get('videos/vehicle/:vehicleId')
  @ApiOperation({
    summary: 'Obtener videos por ID de vehículo (Admin)',
    description: 'Obtiene todos los videos asociados a un vehículo específico',
  })
  @ApiParam({
    name: 'vehicleId',
    description: 'ID del vehículo',
    example: 'clz123abc456',
  })
  @ApiResponse({
    status: 200,
    description: 'Videos del vehículo obtenidos exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getVideosByVehicle(@Param('vehicleId') vehicleId: string) {
    return await this.videosService.findByVehicleId(vehicleId);
  }

  @Delete('videos/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar video (Admin)',
    description: 'Elimina un video del sistema y de Cloudinary',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del video a eliminar',
    example: 'vid123',
  })
  @ApiResponse({
    status: 204,
    description: 'Video eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Video no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async deleteVideo(@Param('id') id: string) {
    return await this.videosService.remove(id);
  }

  // === GESTIÓN DE CONTACTOS (ADMIN) ===

  @Get('contacts')
  async getAllContacts() {
    return await this.contactsService.findAll();
  }

  @Get('contacts/:id')
  async getContact(@Param('id') id: string) {
    return await this.contactsService.findOne(id);
  }

  @Delete('contacts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteContact(@Param('id') id: string) {
    return await this.contactsService.remove(id);
  }
}
