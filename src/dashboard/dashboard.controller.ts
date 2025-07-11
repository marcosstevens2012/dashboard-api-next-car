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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactsService } from '../contacts/contacts.service';
import { ImagesService } from '../images/images.service';
import {
  CreateVehicleDto,
  HighlightVehicleDto,
  UpdateVehicleDto,
} from '../vehicles/dto/vehicle.dto';
import { VehiclesService } from '../vehicles/vehicles.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard) // Proteger todas las rutas del dashboard
export class DashboardController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly contactsService: ContactsService,
    private readonly imagesService: ImagesService,
  ) {}

  // === ESTADÍSTICAS DASHBOARD ===

  @Get('stats')
  async getDashboardStats() {
    return await this.vehiclesService.getStats();
  }

  // === GESTIÓN DE VEHÍCULOS (ADMIN) ===

  @Get('vehicles')
  async getAllVehicles() {
    return await this.vehiclesService.findAll();
  }

  @Post('vehicles')
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Get('vehicles/:id')
  async getVehicle(@Param('id') id: string) {
    return await this.vehiclesService.findOne(id);
  }

  @Patch('vehicles/:id')
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

  @Get('images')
  async getAllImages() {
    return await this.imagesService.findAll();
  }

  @Delete('images/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('id') id: string) {
    return await this.imagesService.remove(id);
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
