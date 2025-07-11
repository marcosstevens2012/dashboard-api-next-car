import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
