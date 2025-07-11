import { Module } from '@nestjs/common';
import { ContactsModule } from '../contacts/contacts.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { PublicController } from './public.controller';

@Module({
  imports: [VehiclesModule, ContactsModule],
  controllers: [PublicController],
})
export class PublicModule {}
