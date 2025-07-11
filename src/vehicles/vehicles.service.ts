import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleFiltersDto,
  VehiclePaginationDto,
} from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
      include: {
        images: true,
      },
    });
  }

  // Método principal con paginación y filtros para página web
  async findAllPaginated(query: VehicleFiltersDto & VehiclePaginationDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      ...filters
    } = query;
    const skip = (page - 1) * limit;

    // Construir filtros de Prisma
    const where: Prisma.VehicleWhereInput = {};

    if (filters.search) {
      where.OR = [
        { nombre: { contains: filters.search, mode: 'insensitive' } },
        { marca: { contains: filters.search, mode: 'insensitive' } },
        { modelo: { contains: filters.search, mode: 'insensitive' } },
        { descripcion: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.marca) {
      where.marca = { equals: filters.marca, mode: 'insensitive' };
    }

    if (filters.combustible) {
      where.combustible = {
        equals: filters.combustible,
        mode: 'insensitive',
      };
    }

    if (filters.transmision) {
      where.transmision = {
        equals: filters.transmision,
        mode: 'insensitive',
      };
    }

    if (filters.traccion) {
      where.traccion = { equals: filters.traccion, mode: 'insensitive' };
    }

    if (filters.anioMin || filters.anioMax) {
      where.anio = {};
      if (filters.anioMin) where.anio.gte = filters.anioMin;
      if (filters.anioMax) where.anio.lte = filters.anioMax;
    }

    if (filters.precioMin || filters.precioMax) {
      where.precio = {};
      if (filters.precioMin) where.precio.gte = filters.precioMin;
      if (filters.precioMax) where.precio.lte = filters.precioMax;
    }

    if (filters.destacado !== undefined) {
      where.destacado = filters.destacado;
    }

    // Ejecutar consultas
    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        include: {
          images: {
            take: 1, // Solo la primera imagen para el listado
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    // Formatear datos para la página web
    const formattedVehicles = vehicles.map((vehicle) => ({
      id: vehicle.id,
      nombre: vehicle.nombre,
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      anio: vehicle.anio,
      precio: vehicle.precio,
      descripcion: vehicle.descripcion,
      destacado: vehicle.destacado,
      // Información resumida para listado
      cilindrada: vehicle.cilindrada,
      kilometraje: vehicle.kilometraje,
      combustible: vehicle.combustible,
      transmision: vehicle.transmision,
      traccion: vehicle.traccion,
      // Primera imagen
      imagen: vehicle.images[0]?.url || null,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      data: formattedVehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      filters: filters,
    };
  }

  // Vehículos destacados para homepage
  async findFeatured(query: VehiclePaginationDto) {
    const { page = 1, limit = 6 } = query;
    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where: { destacado: true },
        include: {
          images: {
            take: 1,
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.vehicle.count({ where: { destacado: true } }),
    ]);

    const formattedVehicles = vehicles.map((vehicle) => ({
      id: vehicle.id,
      nombre: vehicle.nombre,
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      anio: vehicle.anio,
      precio: vehicle.precio,
      cilindrada: vehicle.cilindrada,
      kilometraje: vehicle.kilometraje,
      combustible: vehicle.combustible,
      transmision: vehicle.transmision,
      traccion: vehicle.traccion,
      imagen: vehicle.images[0]?.url || null,
    }));

    return {
      data: formattedVehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Estadísticas para dashboard
  async getStats() {
    const [
      totalVehicles,
      featuredVehicles,
      brandStats,
      yearStats,
      averagePrice,
    ] = await Promise.all([
      this.prisma.vehicle.count(),
      this.prisma.vehicle.count({ where: { destacado: true } }),
      this.prisma.vehicle.groupBy({
        by: ['marca'],
        _count: { marca: true },
        orderBy: { _count: { marca: 'desc' } },
        take: 10,
      }),
      this.prisma.vehicle.groupBy({
        by: ['anio'],
        _count: { anio: true },
        orderBy: { anio: 'desc' },
        take: 10,
      }),
      this.prisma.vehicle.aggregate({
        _avg: { precio: true },
      }),
    ]);

    return {
      totalVehicles,
      featuredVehicles,
      averagePrice: averagePrice._avg.precio || 0,
      vehiclesByBrand: brandStats.reduce((acc, item) => {
        acc[item.marca] = item._count.marca;
        return acc;
      }, {}),
      vehiclesByYear: yearStats.reduce((acc, item) => {
        acc[item.anio.toString()] = item._count.anio;
        return acc;
      }, {}),
    };
  }

  // Opciones para filtros (valores únicos)
  async getFilterOptions() {
    const [marcas, combustibles, transmisiones, tracciones, years] =
      await Promise.all([
        this.prisma.vehicle.findMany({
          select: { marca: true },
          distinct: ['marca'],
          orderBy: { marca: 'asc' },
        }),
        this.prisma.vehicle.findMany({
          select: { combustible: true },
          distinct: ['combustible'],
          where: { combustible: { not: null } },
          orderBy: { combustible: 'asc' },
        }),
        this.prisma.vehicle.findMany({
          select: { transmision: true },
          distinct: ['transmision'],
          where: { transmision: { not: null } },
          orderBy: { transmision: 'asc' },
        }),
        this.prisma.vehicle.findMany({
          select: { traccion: true },
          distinct: ['traccion'],
          where: { traccion: { not: null } },
          orderBy: { traccion: 'asc' },
        }),
        this.prisma.vehicle.findMany({
          select: { anio: true },
          distinct: ['anio'],
          orderBy: { anio: 'desc' },
        }),
      ]);

    return {
      marcas: marcas.map((v) => v.marca),
      combustibles: combustibles.map((v) => v.combustible).filter(Boolean),
      transmisiones: transmisiones.map((v) => v.transmision).filter(Boolean),
      tracciones: tracciones.map((v) => v.traccion).filter(Boolean),
      years: years.map((v) => v.anio),
    };
  }

  // Método original para dashboard (sin filtros)
  async findAll() {
    return this.prisma.vehicle.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
      include: {
        images: true,
      },
    });
  }

  async remove(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return this.prisma.vehicle.delete({
      where: { id },
    });
  }

  async highlight(id: string, destacado: boolean) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return this.prisma.vehicle.update({
      where: { id },
      data: { destacado },
      include: {
        images: true,
      },
    });
  }
}
