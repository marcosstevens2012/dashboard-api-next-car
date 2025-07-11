import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImageDto } from './dto/image.dto';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async create(createImageDto: CreateImageDto) {
    return this.prisma.image.create({
      data: createImageDto,
    });
  }

  async findAll() {
    return this.prisma.image.findMany({
      include: {
        vehicle: true,
      },
    });
  }

  async findOne(id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async remove(id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return this.prisma.image.delete({
      where: { id },
    });
  }

  async findByVehicleId(vehicleId: string) {
    return this.prisma.image.findMany({
      where: { vehicleId },
    });
  }
}
