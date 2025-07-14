import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ContactsService } from '../contacts/contacts.service';
import { CreateContactDto } from '../contacts/dto/contact.dto';
import {
  VehicleFiltersDto,
  VehiclePaginationDto,
} from '../vehicles/dto/vehicle.dto';
import { VehiclesService } from '../vehicles/vehicles.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly contactsService: ContactsService,
  ) {}

  // === VEHÍCULOS PÚBLICOS ===

  @Get('vehicles')
  @Throttle({ default: { limit: 100, ttl: 60000 } }) // 100 requests per minute
  @ApiOperation({
    summary: 'Obtener lista pública de vehículos',
    description:
      'Lista paginada de vehículos con filtros. Rate limit: 100 requests/min',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'search', required: false, type: 'string' })
  @ApiQuery({ name: 'marca', required: false, type: 'string' })
  @ApiQuery({ name: 'combustible', required: false, type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos obtenida exitosamente.',
  })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes.' })
  async getVehicles(@Query() query: VehicleFiltersDto & VehiclePaginationDto) {
    return await this.vehiclesService.findAllPaginated(query);
  }

  @Get('vehicles/featured')
  @Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 requests per minute
  @ApiOperation({
    summary: 'Obtener vehículos destacados',
    description:
      'Lista de vehículos marcados como destacados. Rate limit: 50 requests/min',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Vehículos destacados obtenidos exitosamente.',
  })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes.' })
  async getFeaturedVehicles(@Query() query: VehiclePaginationDto) {
    return await this.vehiclesService.findFeatured(query);
  }

  @Get('vehicles/filter-options')
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requests per minute
  @ApiOperation({
    summary: 'Obtener opciones de filtros',
    description:
      'Opciones disponibles para filtros de vehículos. Rate limit: 20 requests/min',
  })
  @ApiResponse({
    status: 200,
    description: 'Opciones de filtros obtenidas exitosamente.',
  })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes.' })
  async getFilterOptions() {
    return await this.vehiclesService.getFilterOptions();
  }

  @Get('vehicles/:id')
  @Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 requests per minute
  @ApiOperation({
    summary: 'Obtener vehículo por ID',
    description:
      'Obtiene un vehículo específico por su ID. Rate limit: 50 requests/min',
  })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes.' })
  async getVehicle(@Param('id') id: string) {
    return await this.vehiclesService.findOne(id);
  }

  // === CONTACTOS PÚBLICOS ===

  @Post('contacts')
  @Throttle({ default: { limit: 5, ttl: 300000 } }) // 5 contacts per 5 minutes
  @ApiOperation({
    summary: 'Crear consulta de contacto',
    description:
      'Crea una nueva consulta de contacto. Rate limit: 5 requests/5min',
  })
  @ApiResponse({ status: 201, description: 'Consulta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes.' })
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.create(createContactDto);
  }
}
