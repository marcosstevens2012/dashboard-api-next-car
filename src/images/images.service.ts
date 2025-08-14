import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { CreateImageDto, UpdateImagesOrderDto } from './dto/image.dto';

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
}

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
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
    const image = this.imageRepository.create(createImageDto);
    return await this.imageRepository.save(image);
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

      const image = this.imageRepository.create(imageData);
      return await this.imageRepository.save(image);
    } catch (error) {
      throw new Error(
        `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async findAll() {
    return await this.imageRepository.find({
      relations: ['vehicle'],
    });
  }

  async findOne(id: string) {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async remove(id: string) {
    const image = await this.imageRepository.findOne({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    // Eliminar imagen de Cloudinary si tiene publicId
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // Continuar con la eliminación de la base de datos aunque falle Cloudinary
      }
    }

    return await this.imageRepository.remove(image);
  }

  async findByVehicleId(vehicleId: string) {
    return await this.imageRepository.find({
      where: { vehicleId },
      order: { isPrincipal: 'DESC', sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async setPrincipal(id: string) {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    // Primero, quitar la marca principal de todas las imágenes del mismo vehículo
    await this.imageRepository.update(
      { vehicleId: image.vehicleId },
      { isPrincipal: false },
    );

    // Luego, marcar esta imagen como principal
    await this.imageRepository.update(id, { isPrincipal: true });

    return await this.imageRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });
  }

  async updateImagesOrder(updateOrderDto: UpdateImagesOrderDto) {
    const { images } = updateOrderDto;

    // Verificar que todas las imágenes existen
    const imageIds = images.map((img) => img.id);
    const existingImages = await this.imageRepository
      .createQueryBuilder('image')
      .where('image.id IN (:...ids)', { ids: imageIds })
      .getMany();

    if (existingImages.length !== images.length) {
      throw new NotFoundException('One or more images not found');
    }

    // Actualizar el orden de cada imagen
    const updatePromises = images.map((imageOrder) =>
      this.imageRepository.update(imageOrder.id, {
        sortOrder: imageOrder.sortOrder,
      }),
    );

    await Promise.all(updatePromises);

    // Retornar las imágenes actualizadas ordenadas
    return await this.imageRepository
      .createQueryBuilder('image')
      .leftJoinAndSelect('image.vehicle', 'vehicle')
      .where('image.id IN (:...ids)', { ids: imageIds })
      .orderBy('image.sortOrder', 'ASC')
      .getMany();
  }
}
