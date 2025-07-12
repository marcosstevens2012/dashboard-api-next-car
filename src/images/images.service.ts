import { Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImageDto } from './dto/image.dto';

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
}

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {
    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<CloudinaryResult> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: 'nextcar-vehicles',
            quality: 'auto:best',
            format: 'webp',
          },
          (error, result) => {
            if (error) {
              reject(new Error(error.message));
            } else {
              resolve(result as CloudinaryResult);
            }
          },
        )
        .end(file.buffer);
    });
  }

  async create(createImageDto: CreateImageDto) {
    return this.prisma.image.create({
      data: createImageDto,
    });
  }

  async createFromFile(file: Express.Multer.File, vehicleId: string) {
    try {
      const cloudinaryResult = await this.uploadToCloudinary(file);

      const imageData = {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        vehicleId,
        filename: file.originalname,
      };

      return this.prisma.image.create({
        data: imageData,
      });
    } catch (error) {
      throw new Error(
        `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
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
