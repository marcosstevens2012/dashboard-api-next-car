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
} from '@nestjs/common';
import { VehicleSale } from '../entities/vehicle-sale.entity';
import { CreateVehicleSaleDto } from './dto/vehicle-sale.dto';
import { VehicleSalesService } from './vehicle-sales.service';

@Controller('vehicle-sales')
export class VehicleSalesController {
  constructor(private readonly vehicleSalesService: VehicleSalesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createVehicleSaleDto: CreateVehicleSaleDto,
  ): Promise<VehicleSale> {
    return await this.vehicleSalesService.create(createVehicleSaleDto);
  }

  @Get()
  async findAll(): Promise<VehicleSale[]> {
    return await this.vehicleSalesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleSale> {
    return await this.vehicleSalesService.findOne(id);
  }

  @Patch(':id/process')
  async markAsProcessed(@Param('id') id: string): Promise<VehicleSale> {
    return await this.vehicleSalesService.markAsProcessed(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.vehicleSalesService.remove(id);
  }
}
