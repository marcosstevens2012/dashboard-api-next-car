import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nombre completo del contacto',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Apellido del contacto',
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    description: 'Ciudad de residencia',
    example: 'Buenos Aires',
  })
  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @ApiProperty({
    description: 'Provincia de residencia',
    example: 'Buenos Aires',
  })
  @IsString()
  @IsNotEmpty()
  provincia: string;

  @ApiProperty({
    description: 'Número de teléfono',
    example: '+54 9 11 1234-5678',
  })
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ApiProperty({
    description: 'Dirección de correo electrónico',
    example: 'juan@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mensaje o consulta del cliente',
    example:
      'Estoy interesado en obtener más información sobre el Toyota Corolla',
  })
  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
