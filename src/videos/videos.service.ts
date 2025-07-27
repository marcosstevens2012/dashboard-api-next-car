import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { CreateVideoDto } from './dto/video.dto';

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  duration?: number;
}

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
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
            resource_type: 'video',
            folder: 'nextcar-vehicles/videos',
            quality: 'auto:good',
            transformation: [
              { width: 1280, height: 720, crop: 'limit' },
              { format: 'mp4' },
            ],
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

  async create(createVideoDto: CreateVideoDto) {
    const video = this.videoRepository.create(createVideoDto);
    return await this.videoRepository.save(video);
  }

  async createFromFile(file: Express.Multer.File, vehicleId: string) {
    try {
      const cloudinaryResult = await this.uploadToCloudinary(file);

      const videoData = {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        vehicleId,
        filename: file.originalname,
      };

      const video = this.videoRepository.create(videoData);
      return await this.videoRepository.save(video);
    } catch (error) {
      throw new Error(
        `Failed to upload video: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async findAll() {
    return await this.videoRepository.find({
      relations: ['vehicle'],
    });
  }

  async findOne(id: string) {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    return video;
  }

  async remove(id: string) {
    const video = await this.videoRepository.findOne({
      where: { id },
    });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    // Eliminar video de Cloudinary si tiene publicId
    if (video.publicId) {
      try {
        await cloudinary.uploader.destroy(video.publicId, {
          resource_type: 'video',
        });
      } catch (error) {
        console.error('Error deleting video from Cloudinary:', error);
        // Continuar con la eliminación de la base de datos aunque falle Cloudinary
      }
    }

    return await this.videoRepository.remove(video);
  }

  async findByVehicleId(vehicleId: string) {
    return await this.videoRepository.find({
      where: { vehicleId },
    });
  }
}
