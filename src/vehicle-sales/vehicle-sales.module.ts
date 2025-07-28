import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleSale } from '../entities/vehicle-sale.entity';
import { VehicleSalesController } from './vehicle-sales.controller';
import { VehicleSalesService } from './vehicle-sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleSale])],
  controllers: [VehicleSalesController],
  providers: [VehicleSalesService],
  exports: [VehicleSalesService],
})
export class VehicleSalesModule {}
