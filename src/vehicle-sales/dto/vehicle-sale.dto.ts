import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVehicleSaleDto {
  // Información del cliente
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  ciudad: string;

  @IsNotEmpty()
  @IsString()
  provincia: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  mensaje?: string;

  // Información del vehículo
  @IsNotEmpty()
  @IsString()
  vehiculoMarca: string;

  @IsNotEmpty()
  @IsString()
  vehiculoModelo: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  vehiculoAnio: number;

  @IsOptional()
  @IsString()
  vehiculoKilometraje?: string;

  @IsOptional()
  @IsString()
  vehiculoCombustible?: string;

  @IsOptional()
  @IsString()
  vehiculoTransmision?: string;

  @IsOptional()
  @IsString()
  vehiculoDescripcion?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  precioEsperado?: number;
}
