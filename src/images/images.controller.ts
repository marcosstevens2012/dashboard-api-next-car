import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateImagesOrderDto } from './dto/image.dto';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las imágenes',
    description: 'Lista todas las imágenes de vehículos en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de imágenes obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'img123' },
          url: { type: 'string', example: '/uploads/vehicle-1234567890.jpg' },
          vehicleId: { type: 'string', example: 'clz123abc456' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener imagen por ID',
    description: 'Obtiene una imagen específica por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la imagen',
    example: 'img123',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen encontrada',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        url: { type: 'string' },
        vehicleId: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar imagen',
    description: 'Elimina una imagen del sistema y del servidor de archivos',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la imagen a eliminar',
    example: 'img123',
  })
  @ApiResponse({
    status: 204,
    description: 'Imagen eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }

  @Patch('order')
  @ApiOperation({
    summary: 'Actualizar orden de imágenes',
    description: 'Actualiza el orden de visualización de múltiples imágenes',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden de imágenes actualizado exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'img123' },
          url: { type: 'string', example: '/uploads/vehicle-1234567890.jpg' },
          vehicleId: { type: 'string', example: 'clz123abc456' },
          sortOrder: { type: 'number', example: 1 },
          isPrincipal: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Una o más imágenes no encontradas',
  })
  updateOrder(@Body() updateOrderDto: UpdateImagesOrderDto) {
    return this.imagesService.updateImagesOrder(updateOrderDto);
  }
}
