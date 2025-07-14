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
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from '../images/images.service';
import {
  CreateVehicleDto,
  HighlightVehicleDto,
  UpdateVehicleDto,
  VehicleFiltersDto,
  VehiclePaginationDto,
} from './dto/vehicle.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo vehículo',
    description:
      'Crea un nuevo vehículo en el sistema con toda la información técnica',
  })
  @ApiResponse({
    status: 201,
    description: 'Vehículo creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'clz123abc456' },
        nombre: { type: 'string', example: 'Toyota Corolla XEI' },
        marca: { type: 'string', example: 'Toyota' },
        modelo: { type: 'string', example: 'Corolla' },
        anio: { type: 'number', example: 2023 },
        precio: { type: 'number', example: 25000 },
        descripcion: {
          type: 'string',
          example: 'Sedán compacto con excelente rendimiento',
        },
        destacado: { type: 'boolean', example: false },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'precio must be a positive number',
            'anio must be between 1900 and 2030',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  // Endpoint principal para página web con paginación y filtros
  @Get()
  @ApiOperation({
    summary: 'Obtener lista de vehículos con filtros y paginación',
    description:
      'Obtiene una lista paginada de vehículos con filtros avanzados',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'Número de página (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'Elementos por página (default: 10, max: 100)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: 'string',
    description: 'Búsqueda en nombre, marca y modelo',
    example: 'Toyota Corolla',
  })
  @ApiQuery({
    name: 'marca',
    required: false,
    type: 'string',
    description: 'Filtrar por marca específica',
    example: 'Toyota',
  })
  @ApiQuery({
    name: 'combustible',
    required: false,
    type: 'string',
    description: 'Filtrar por tipo de combustible',
    example: 'Nafta',
  })
  @ApiQuery({
    name: 'transmision',
    required: false,
    type: 'string',
    description: 'Filtrar por tipo de transmisión',
    example: 'Automática',
  })
  @ApiQuery({
    name: 'traccion',
    required: false,
    type: 'string',
    description: 'Filtrar por tipo de tracción',
    example: '4x2',
  })
  @ApiQuery({
    name: 'anioMin',
    required: false,
    type: 'number',
    description: 'Año mínimo',
    example: 2020,
  })
  @ApiQuery({
    name: 'anioMax',
    required: false,
    type: 'number',
    description: 'Año máximo',
    example: 2024,
  })
  @ApiQuery({
    name: 'precioMin',
    required: false,
    type: 'number',
    description: 'Precio mínimo en USD',
    example: 15000,
  })
  @ApiQuery({
    name: 'precioMax',
    required: false,
    type: 'number',
    description: 'Precio máximo en USD',
    example: 50000,
  })
  @ApiQuery({
    name: 'destacado',
    required: false,
    type: 'boolean',
    description: 'Solo vehículos destacados',
    example: true,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['nombre', 'marca', 'precio', 'anio', 'createdAt'],
    description: 'Campo para ordenar',
    example: 'precio',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Orden de clasificación',
    example: 'asc',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              nombre: { type: 'string' },
              marca: { type: 'string' },
              modelo: { type: 'string' },
              anio: { type: 'number' },
              precio: { type: 'number' },
              descripcion: { type: 'string' },
              destacado: { type: 'boolean' },
              combustible: { type: 'string' },
              transmision: { type: 'string' },
              images: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    url: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 150 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 15 },
            hasNextPage: { type: 'boolean', example: true },
            hasPrevPage: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  async findAll(@Query() query: VehicleFiltersDto & VehiclePaginationDto) {
    return await this.vehiclesService.findAllPaginated(query);
  }

  // Endpoint para obtener vehículos destacados (página web)
  @Get('featured')
  @ApiOperation({ summary: 'Obtener vehículos destacados' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Vehículos destacados obtenidos exitosamente.',
  })
  async findFeatured(@Query() query: VehiclePaginationDto) {
    return await this.vehiclesService.findFeatured(query);
  }

  // Endpoint para obtener estadísticas (dashboard)
  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de vehículos' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente.',
  })
  async getStats() {
    return await this.vehiclesService.getStats();
  }

  // Endpoint para obtener opciones de filtros (página web)
  @Get('filter-options')
  @ApiOperation({ summary: 'Obtener opciones disponibles para filtros' })
  @ApiResponse({
    status: 200,
    description: 'Opciones de filtros obtenidas exitosamente.',
  })
  async getFilterOptions() {
    return await this.vehiclesService.getFilterOptions();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un vehículo por ID',
    description:
      'Obtiene toda la información detallada de un vehículo específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del vehículo',
    example: 'clz123abc456',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehículo encontrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'clz123abc456' },
        nombre: { type: 'string', example: 'Toyota Corolla XEI' },
        marca: { type: 'string', example: 'Toyota' },
        modelo: { type: 'string', example: 'Corolla' },
        anio: { type: 'number', example: 2023 },
        precio: { type: 'number', example: 25000 },
        descripcion: {
          type: 'string',
          example: 'Sedán compacto con excelente rendimiento',
        },
        destacado: { type: 'boolean', example: true },
        kilometraje: { type: 'string', example: '15.000 km' },
        combustible: { type: 'string', example: 'Nafta' },
        transmision: { type: 'string', example: 'Automática' },
        traccion: { type: 'string', example: '4x2' },
        images: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              url: { type: 'string' },
              vehicleId: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Vehicle not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un vehículo',
    description:
      'Actualiza parcialmente la información de un vehículo existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del vehículo a actualizar',
    example: 'clz123abc456',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehículo actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        nombre: { type: 'string' },
        marca: { type: 'string' },
        modelo: { type: 'string' },
        anio: { type: 'number' },
        precio: { type: 'number' },
        descripcion: { type: 'string' },
        destacado: { type: 'boolean' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
  })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({ status: 204, description: 'Vehículo eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }

  @Patch(':id/highlight')
  @ApiOperation({ summary: 'Marcar/desmarcar vehículo como destacado' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({ status: 200, description: 'Estado destacado actualizado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  highlight(
    @Param('id') id: string,
    @Body() highlightDto: HighlightVehicleDto,
  ) {
    return this.vehiclesService.highlight(id, highlightDto.destacado);
  }

  @Post(':id/images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `vehicle-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  @ApiOperation({ summary: 'Subir imágenes a un vehículo' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivos de imagen',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Imágenes subidas exitosamente.' })
  @ApiResponse({ status: 400, description: 'Archivos inválidos.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  async uploadImages(
    @Param('id') vehicleId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Verificar que el vehículo existe
    await this.vehiclesService.findOne(vehicleId);

    // Crear registros de imagen en la base de datos
    const imagePromises = files.map((file) =>
      this.imagesService.create({
        url: `/uploads/${file.filename}`,
        vehicleId,
      }),
    );

    return await Promise.all(imagePromises);
  }
}
