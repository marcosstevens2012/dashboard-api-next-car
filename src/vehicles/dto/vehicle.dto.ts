import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

// DTOs para filtros y paginación
export class VehiclePaginationDto {
  @ApiPropertyOptional({
    description: 'Número de página',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Elementos por página',
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Campo para ordenar',
    enum: ['nombre', 'marca', 'precio', 'anio', 'createdAt'],
    default: 'createdAt',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'nombre' | 'marca' | 'precio' | 'anio' | 'createdAt' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Orden de clasificación',
    enum: ['asc', 'desc'],
    default: 'desc',
    example: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}

export class VehicleFiltersDto {
  @ApiPropertyOptional({
    description: 'Búsqueda en nombre, marca y modelo',
    example: 'Toyota Corolla',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por marca',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  marca?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo de combustible',
    example: 'Nafta',
  })
  @IsOptional()
  @IsString()
  combustible?: string;

  @IsOptional()
  @IsString()
  transmision?: string;

  @IsOptional()
  @IsString()
  traccion?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1900)
  anioMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Max(2030)
  anioMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precioMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  precioMax?: number;

  @IsOptional()
  @IsString()
  kilometrajeMax?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  destacado?: boolean;
}

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Nombre del vehículo',
    example: 'Toyota Corolla XEI',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Marca del vehículo',
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({
    description: 'Modelo del vehículo',
    example: 'Corolla',
  })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({
    description: 'Año del vehículo',
    minimum: 1900,
    example: 2023,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1900)
  anio: number;

  @ApiProperty({
    description: 'Precio del vehículo en USD',
    minimum: 0,
    example: 25000,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  precio: number;

  @ApiProperty({
    description: 'Descripción del vehículo',
    example: 'Sedán compacto con excelente rendimiento de combustible',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiPropertyOptional({
    description: 'Si el vehículo está destacado',
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  destacado?: boolean;

  // Información básica adicional
  @ApiPropertyOptional({
    description: 'Kilometraje del vehículo',
    example: '15.000 km',
  })
  @IsOptional()
  @IsString()
  kilometraje?: string;

  @ApiPropertyOptional({
    description: 'Observaciones adicionales',
    example: 'Único dueño, service al día',
  })
  @IsOptional()
  @IsString()
  observaciones?: string;

  // Motor
  @ApiPropertyOptional({
    description: 'Tipo de combustible',
    example: 'Nafta',
  })
  @IsOptional()
  @IsString()
  combustible?: string;

  @ApiPropertyOptional({
    description: 'Cilindrada del motor',
    example: '1.8L',
  })
  @IsOptional()
  @IsString()
  cilindrada?: string;

  @ApiPropertyOptional({
    description: 'Potencia del motor',
    example: '140 HP',
  })
  @IsOptional()
  @IsString()
  potencia?: string;

  @ApiPropertyOptional({
    description: 'Sistema de alimentación',
    example: 'Inyección',
  })
  @IsOptional()
  @IsString()
  alimentacion?: string;

  @ApiPropertyOptional({
    description: 'Número de cilindros',
    example: 4,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cilindros?: number;

  @ApiPropertyOptional({
    description: 'Número de válvulas',
    example: 16,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  valvulas?: number;

  // Transmisión y chasis
  @ApiPropertyOptional({
    description: 'Tipo de tracción',
    example: '4x2',
  })
  @IsOptional()
  @IsString()
  traccion?: string;

  @ApiPropertyOptional({
    description: 'Tipo de transmisión',
    example: 'Automática',
  })
  @IsOptional()
  @IsString()
  transmision?: string;

  @ApiPropertyOptional({
    description: 'Número de velocidades',
    example: 'CVT',
  })
  @IsOptional()
  @IsString()
  velocidades?: string;

  @ApiPropertyOptional({
    description: 'Especificación de neumáticos',
    example: '205/55 R16',
  })
  @IsOptional()
  @IsString()
  neumaticos?: string;

  @ApiPropertyOptional({
    description: 'Tipo de frenos delanteros',
    example: 'Disco ventilado',
  })
  @IsOptional()
  @IsString()
  frenosDelanteros?: string;

  @ApiPropertyOptional({
    description: 'Tipo de frenos traseros',
    example: 'Disco sólido',
  })
  @IsOptional()
  @IsString()
  frenosTraseros?: string;

  @ApiPropertyOptional({
    description: 'Dirección asistida',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  direccionAsistida?: boolean;

  @ApiPropertyOptional({
    description: 'Tipo de dirección asistida',
    example: 'Eléctrica',
  })
  @IsOptional()
  @IsString()
  direccionAsistidaTipo?: string;

  // Equipamiento - Confort
  @ApiPropertyOptional({
    description: 'Aire acondicionado',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  aireAcondicionado?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asientoDelanteroAjuste?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  volanteRegulable?: boolean;

  @IsOptional()
  @IsString()
  asientosTraseros?: string;

  @IsOptional()
  @IsString()
  tapizados?: string;

  @IsOptional()
  @IsString()
  cierrePuertas?: string;

  @IsOptional()
  @IsString()
  vidriosDelanteros?: string;

  @IsOptional()
  @IsString()
  vidriosTraseros?: string;

  @IsOptional()
  @IsString()
  espejosExteriores?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  farosAntiniebla?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  computadoraBordo?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  llantasAleacion?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  camaraEstacionamiento?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asistenciaArranquePendientes?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlEconomiaCombustible?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  luzDiurna?: boolean;

  // Equipamiento - Seguridad
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  abs?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  distribucionElectronicaFrenado?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asistenciaFrenadaEmergencia?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  airbagsDelanteros?: boolean;

  @IsOptional()
  @IsString()
  airbagsCortina?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  airbagRodillaConductor?: boolean;

  @IsOptional()
  @IsString()
  airbagsLaterales?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  alarma?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  inmovilizadorMotor?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anclajeAsientosInfantiles?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  autobloqueoPuertas?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlEstabilidad?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlTraccion?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cantidadAirbags?: number;

  // Comunicación y entretenimiento
  @IsOptional()
  @IsString()
  equipoMusica?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  comandosVolante?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  conexionAuxiliar?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  conexionUSB?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  interfazBluetooth?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlVozDispositivos?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  pantalla?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  sistemaNavegacionGPS?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  appleCarPlay?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  mirrorlink?: boolean;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  marca?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  modelo?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1900)
  anio?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  precio?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  destacado?: boolean;

  // Información básica adicional
  @IsOptional()
  @IsString()
  kilometraje?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  // Motor
  @IsOptional()
  @IsString()
  combustible?: string;

  @IsOptional()
  @IsString()
  cilindrada?: string;

  @IsOptional()
  @IsString()
  potencia?: string;

  @IsOptional()
  @IsString()
  alimentacion?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cilindros?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  valvulas?: number;

  // Transmisión y chasis
  @IsOptional()
  @IsString()
  traccion?: string;

  @IsOptional()
  @IsString()
  transmision?: string;

  @IsOptional()
  @IsString()
  velocidades?: string;

  @IsOptional()
  @IsString()
  neumaticos?: string;

  @IsOptional()
  @IsString()
  frenosDelanteros?: string;

  @IsOptional()
  @IsString()
  frenosTraseros?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  direccionAsistida?: boolean;

  @IsOptional()
  @IsString()
  direccionAsistidaTipo?: string;

  // Equipamiento - Confort
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  aireAcondicionado?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asientoDelanteroAjuste?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  volanteRegulable?: boolean;

  @IsOptional()
  @IsString()
  asientosTraseros?: string;

  @IsOptional()
  @IsString()
  tapizados?: string;

  @IsOptional()
  @IsString()
  cierrePuertas?: string;

  @IsOptional()
  @IsString()
  vidriosDelanteros?: string;

  @IsOptional()
  @IsString()
  vidriosTraseros?: string;

  @IsOptional()
  @IsString()
  espejosExteriores?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  farosAntiniebla?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  computadoraBordo?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  llantasAleacion?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  camaraEstacionamiento?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asistenciaArranquePendientes?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlEconomiaCombustible?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  luzDiurna?: boolean;

  // Equipamiento - Seguridad
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  abs?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  distribucionElectronicaFrenado?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asistenciaFrenadaEmergencia?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  airbagsDelanteros?: boolean;

  @IsOptional()
  @IsString()
  airbagsCortina?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  airbagRodillaConductor?: boolean;

  @IsOptional()
  @IsString()
  airbagsLaterales?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  alarma?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  inmovilizadorMotor?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  anclajeAsientosInfantiles?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  autobloqueoPuertas?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlEstabilidad?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlTraccion?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cantidadAirbags?: number;

  // Comunicación y entretenimiento
  @IsOptional()
  @IsString()
  equipoMusica?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  comandosVolante?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  conexionAuxiliar?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  conexionUSB?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  interfazBluetooth?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  controlVozDispositivos?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  pantalla?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  sistemaNavegacionGPS?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  appleCarPlay?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  mirrorlink?: boolean;
}

export class HighlightVehicleDto {
  @IsBoolean()
  @Type(() => Boolean)
  destacado: boolean;
}
