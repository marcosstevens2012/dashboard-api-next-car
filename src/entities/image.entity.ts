import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('images')
export class Image {
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
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}
