import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { ImagesService } from '../images/images.service';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleFiltersDto,
  VehiclePaginationDto,
} from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private imagesService: ImagesService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(vehicle);
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

    // Construir queryBuilder
    const queryBuilder = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.images', 'images')
      .orderBy(`vehicle.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC')
      .skip(skip)
      .take(limit);

    // Aplicar filtros
    if (filters.search) {
      queryBuilder.andWhere(
        '(vehicle.nombre LIKE :search OR vehicle.marca LIKE :search OR vehicle.modelo LIKE :search OR vehicle.descripcion LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters.marca) {
      queryBuilder.andWhere('vehicle.marca = :marca', { marca: filters.marca });
    }

    if (filters.combustible) {
      queryBuilder.andWhere('vehicle.combustible = :combustible', {
        combustible: filters.combustible,
      });
    }

    if (filters.transmision) {
      queryBuilder.andWhere('vehicle.transmision = :transmision', {
        transmision: filters.transmision,
      });
    }

    if (filters.traccion) {
      queryBuilder.andWhere('vehicle.traccion = :traccion', {
        traccion: filters.traccion,
      });
    }

    if (filters.anioMin && filters.anioMax) {
      queryBuilder.andWhere('vehicle.anio BETWEEN :anioMin AND :anioMax', {
        anioMin: filters.anioMin,
        anioMax: filters.anioMax,
      });
    } else if (filters.anioMin) {
      queryBuilder.andWhere('vehicle.anio >= :anioMin', {
        anioMin: filters.anioMin,
      });
    } else if (filters.anioMax) {
      queryBuilder.andWhere('vehicle.anio <= :anioMax', {
        anioMax: filters.anioMax,
      });
    }

    if (filters.precioMin && filters.precioMax) {
      queryBuilder.andWhere(
        'vehicle.precio BETWEEN :precioMin AND :precioMax',
        {
          precioMin: filters.precioMin,
          precioMax: filters.precioMax,
        },
      );
    } else if (filters.precioMin) {
      queryBuilder.andWhere('vehicle.precio >= :precioMin', {
        precioMin: filters.precioMin,
      });
    } else if (filters.precioMax) {
      queryBuilder.andWhere('vehicle.precio <= :precioMax', {
        precioMax: filters.precioMax,
      });
    }

    if (filters.destacado !== undefined) {
      queryBuilder.andWhere('vehicle.destacado = :destacado', {
        destacado: filters.destacado,
      });
    }

    const [vehicles, total] = await queryBuilder.getManyAndCount();

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
      this.vehicleRepository.find({
        where: { destacado: true },
        relations: ['images'],
        order: { createdAt: 'DESC' },
        skip,
        take: limit,
      }),
      this.vehicleRepository.count({ where: { destacado: true } }),
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
    const [totalVehicles, featuredVehicles] = await Promise.all([
      this.vehicleRepository.count(),
      this.vehicleRepository.count({ where: { destacado: true } }),
    ]);

    // Para estadísticas más complejas usamos queryBuilder
    const brandStatsQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('vehicle.marca', 'marca')
      .addSelect('COUNT(*)', 'count')
      .groupBy('vehicle.marca')
      .orderBy('count', 'DESC')
      .limit(10);

    const yearStatsQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('vehicle.anio', 'anio')
      .addSelect('COUNT(*)', 'count')
      .groupBy('vehicle.anio')
      .orderBy('vehicle.anio', 'DESC')
      .limit(10);

    const avgPriceQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('AVG(vehicle.precio)', 'average');

    const [brandStats, yearStats, avgPriceResult] = await Promise.all([
      brandStatsQuery.getRawMany(),
      yearStatsQuery.getRawMany(),
      avgPriceQuery.getRawOne(),
    ]);

    return {
      totalVehicles,
      featuredVehicles,
      averagePrice: parseFloat(avgPriceResult?.average) || 0,
      vehiclesByBrand: brandStats.reduce((acc, item) => {
        acc[item.marca] = parseInt(item.count);
        return acc;
      }, {}),
      vehiclesByYear: yearStats.reduce((acc, item) => {
        acc[item.anio.toString()] = parseInt(item.count);
        return acc;
      }, {}),
    };
  }

  // Opciones para filtros (valores únicos)
  async getFilterOptions() {
    const marcasQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.marca', 'marca')
      .orderBy('vehicle.marca', 'ASC');

    const combustiblesQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.combustible', 'combustible')
      .where('vehicle.combustible IS NOT NULL')
      .orderBy('vehicle.combustible', 'ASC');

    const transmisionesQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.transmision', 'transmision')
      .where('vehicle.transmision IS NOT NULL')
      .orderBy('vehicle.transmision', 'ASC');

    const traccionesQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.traccion', 'traccion')
      .where('vehicle.traccion IS NOT NULL')
      .orderBy('vehicle.traccion', 'ASC');

    const yearsQuery = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.anio', 'anio')
      .orderBy('vehicle.anio', 'DESC');

    const [marcas, combustibles, transmisiones, tracciones, years] =
      await Promise.all([
        marcasQuery.getRawMany(),
        combustiblesQuery.getRawMany(),
        transmisionesQuery.getRawMany(),
        traccionesQuery.getRawMany(),
        yearsQuery.getRawMany(),
      ]);

    return {
      marcas: marcas.map((v) => v.marca).filter(Boolean),
      combustibles: combustibles.map((v) => v.combustible).filter(Boolean),
      transmisiones: transmisiones.map((v) => v.transmision).filter(Boolean),
      tracciones: tracciones.map((v) => v.traccion).filter(Boolean),
      years: years.map((v) => v.anio).filter(Boolean),
    };
  }

  // Método original para dashboard (sin filtros)
  async findAll() {
    return await this.vehicleRepository.find({
      relations: ['images'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    await this.vehicleRepository.update(id, updateVehicleDto);
    return await this.vehicleRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async remove(id: string) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    // Eliminar todas las imágenes del vehículo (esto también las elimina de Cloudinary)
    for (const image of vehicle.images) {
      await this.imagesService.remove(image.id);
    }

    return await this.vehicleRepository.remove(vehicle);
  }

  async highlight(id: string, destacado: boolean) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    vehicle.destacado = destacado;
    await this.vehicleRepository.save(vehicle);

    return await this.vehicleRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }
}
