import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactsService } from '../contacts/contacts.service';
import { CreateContactDto } from '../contacts/dto/contact.dto';
import {
  VehicleFiltersDto,
  VehiclePaginationDto,
} from '../vehicles/dto/vehicle.dto';
import { VehiclesService } from '../vehicles/vehicles.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly contactsService: ContactsService,
  ) {}

  // === VEHÍCULOS PÚBLICOS ===

  @Get('vehicles')
  @Throttle({ default: { limit: 100, ttl: 60000 } }) // 100 requests per minute
  async getVehicles(@Query() query: VehicleFiltersDto & VehiclePaginationDto) {
    return await this.vehiclesService.findAllPaginated(query);
  }

  @Get('vehicles/featured')
  @Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 requests per minute
  async getFeaturedVehicles(@Query() query: VehiclePaginationDto) {
    return await this.vehiclesService.findFeatured(query);
  }

  @Get('vehicles/filter-options')
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requests per minute
  async getFilterOptions() {
    return await this.vehiclesService.getFilterOptions();
  }

  @Get('vehicles/:id')
  @Throttle({ default: { limit: 50, ttl: 60000 } }) // 50 requests per minute
  async getVehicle(@Param('id') id: string) {
    return await this.vehiclesService.findOne(id);
  }

  // === CONTACTOS PÚBLICOS ===

  @Post('contacts')
  @Throttle({ default: { limit: 5, ttl: 300000 } }) // 5 contacts per 5 minutes
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.create(createContactDto);
  }
}
