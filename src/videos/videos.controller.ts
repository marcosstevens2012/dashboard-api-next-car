import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VideosService } from './videos.service';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload/:vehicleId')
  @UseInterceptors(FileInterceptor('video'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Subir video para un vehículo',
    description:
      'Sube un video a Cloudinary y lo asocia con un vehículo específico',
  })
  @ApiParam({
    name: 'vehicleId',
    description: 'ID del vehículo al que se asociará el video',
    example: 'clz123abc456',
  })
  @ApiBody({
    description: 'Archivo de video a subir',
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
          description:
            'Archivo de video (formatos soportados: mp4, avi, mov, mkv)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Video subido exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'vid123' },
        url: {
          type: 'string',
          example:
            'https://res.cloudinary.com/your-cloud/video/upload/v123456/nextcar-vehicles/video123.mp4',
        },
        publicId: {
          type: 'string',
          example: 'nextcar-vehicles/videos/video123',
        },
        filename: { type: 'string', example: 'vehicle_demo.mp4' },
        vehicleId: { type: 'string', example: 'clz123abc456' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Archivo no válido o no se pudo subir',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
  })
  async uploadVideo(
    @Param('vehicleId') vehicleId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.videosService.createFromFile(file, vehicleId);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los videos',
    description: 'Lista todos los videos de vehículos en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de videos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'vid123' },
          url: {
            type: 'string',
            example:
              'https://res.cloudinary.com/your-cloud/video/upload/v123456/nextcar-vehicles/video123.mp4',
          },
          vehicleId: { type: 'string', example: 'clz123abc456' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener video por ID',
    description: 'Obtiene un video específico por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del video',
    example: 'vid123',
  })
  @ApiResponse({
    status: 200,
    description: 'Video encontrado',
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
    description: 'Video no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Get('vehicle/:vehicleId')
  @ApiOperation({
    summary: 'Obtener videos por ID de vehículo',
    description: 'Obtiene todos los videos asociados a un vehículo específico',
  })
  @ApiParam({
    name: 'vehicleId',
    description: 'ID del vehículo',
    example: 'clz123abc456',
  })
  @ApiResponse({
    status: 200,
    description: 'Videos del vehículo obtenidos exitosamente',
    schema: {
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
  })
  findByVehicleId(@Param('vehicleId') vehicleId: string) {
    return this.videosService.findByVehicleId(vehicleId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar video',
    description: 'Elimina un video del sistema y de Cloudinary',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del video a eliminar',
    example: 'vid123',
  })
  @ApiResponse({
    status: 204,
    description: 'Video eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Video no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
