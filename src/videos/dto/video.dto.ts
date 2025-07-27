import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    description: 'URL del video',
    example:
      'https://res.cloudinary.com/your-cloud/video/upload/v123456/nextcar-vehicles/video123.mp4',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'ID público de Cloudinary para eliminación',
    example: 'nextcar-vehicles/video123',
    required: false,
  })
  @IsOptional()
  @IsString()
  publicId?: string;

  @ApiProperty({
    description: 'Nombre original del archivo',
    example: 'vehicle_demo.mp4',
    required: false,
  })
  @IsOptional()
  @IsString()
  filename?: string;

  @ApiProperty({
    description: 'ID del vehículo al que pertenece el video',
    example: 'clz123abc456',
  })
  @IsNotEmpty()
  @IsString()
  vehicleId: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-07-26T10:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string;
}

export class UpdateVideoDto {
  @ApiProperty({
    description: 'URL del video',
    example:
      'https://res.cloudinary.com/your-cloud/video/upload/v123456/nextcar-vehicles/video123.mp4',
    required: false,
  })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({
    description: 'ID público de Cloudinary para eliminación',
    example: 'nextcar-vehicles/video123',
    required: false,
  })
  @IsOptional()
  @IsString()
  publicId?: string;

  @ApiProperty({
    description: 'Nombre original del archivo',
    example: 'vehicle_demo.mp4',
    required: false,
  })
  @IsOptional()
  @IsString()
  filename?: string;

  @ApiProperty({
    description: 'ID del vehículo al que pertenece el video',
    example: 'clz123abc456',
    required: false,
  })
  @IsOptional()
  @IsString()
  vehicleId?: string;
}
