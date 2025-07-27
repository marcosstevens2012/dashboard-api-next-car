import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  publicId?: string;

  @Column({ nullable: true })
  filename?: string;

  @Column()
  vehicleId: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relación con vehículo
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.videos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}
