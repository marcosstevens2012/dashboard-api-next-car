import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ContactsModule } from '../contacts/contacts.module';
import { ImagesModule } from '../images/images.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [VehiclesModule, ContactsModule, ImagesModule, AuthModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
