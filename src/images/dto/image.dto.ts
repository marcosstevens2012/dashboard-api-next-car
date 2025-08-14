import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  vehicleId: string;
}

export class ImageOrderDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  sortOrder: number;
}

export class UpdateImagesOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageOrderDto)
  images: ImageOrderDto[];
}
