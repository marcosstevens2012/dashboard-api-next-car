import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/contact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nueva consulta de contacto',
    description: 'Crea una nueva consulta de contacto desde el formulario web',
  })
  @ApiResponse({
    status: 201,
    description: 'Consulta creada exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'contact123' },
        nombre: { type: 'string', example: 'Juan Pérez' },
        email: { type: 'string', example: 'juan@email.com' },
        telefono: { type: 'string', example: '+54 9 11 1234-5678' },
        mensaje: {
          type: 'string',
          example: 'Estoy interesado en el Toyota Corolla',
        },
        vehiculoInteres: { type: 'string', example: 'Toyota Corolla XEI' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las consultas de contacto',
    description: 'Lista todas las consultas de contacto recibidas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de contactos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nombre: { type: 'string' },
          email: { type: 'string' },
          telefono: { type: 'string' },
          mensaje: { type: 'string' },
          vehiculoInteres: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener consulta de contacto por ID',
    description: 'Obtiene una consulta de contacto específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la consulta de contacto',
    example: 'contact123',
  })
  @ApiResponse({
    status: 200,
    description: 'Consulta de contacto encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar consulta de contacto',
    description: 'Elimina una consulta de contacto del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la consulta a eliminar',
    example: 'contact123',
  })
  @ApiResponse({
    status: 204,
    description: 'Consulta eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Consulta no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
