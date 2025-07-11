import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1900)
  anio: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  precio: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

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
