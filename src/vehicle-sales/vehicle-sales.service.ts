import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleSale } from '../entities/vehicle-sale.entity';
import { CreateVehicleSaleDto } from './dto/vehicle-sale.dto';

@Injectable()
export class VehicleSalesService {
  constructor(
    @InjectRepository(VehicleSale)
    private vehicleSalesRepository: Repository<VehicleSale>,
  ) {}

  async create(
    createVehicleSaleDto: CreateVehicleSaleDto,
  ): Promise<VehicleSale> {
    const vehicleSale =
      this.vehicleSalesRepository.create(createVehicleSaleDto);
    return await this.vehicleSalesRepository.save(vehicleSale);
  }

  async findAll(): Promise<VehicleSale[]> {
    return await this.vehicleSalesRepository.find({
      order: { creadoEn: 'DESC' },
    });
  }

  async findOne(id: string): Promise<VehicleSale> {
    const vehicleSale = await this.vehicleSalesRepository.findOne({
      where: { id },
    });
    if (!vehicleSale) {
      throw new NotFoundException(
        `Venta de vehículo con ID ${id} no encontrada`,
      );
    }
    return vehicleSale;
  }

  async markAsProcessed(id: string): Promise<VehicleSale> {
    await this.vehicleSalesRepository.update(id, { procesado: true });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.vehicleSalesRepository.delete(id);
  }
}
