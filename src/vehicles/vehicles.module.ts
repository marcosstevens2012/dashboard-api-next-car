import { Module } from '@nestjs/common';
import { ImagesModule } from '../images/images.module';
import { PrismaModule } from '../prisma/prisma.module';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [PrismaModule, ImagesModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
