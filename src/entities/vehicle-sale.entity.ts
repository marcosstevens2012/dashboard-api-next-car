import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vehicle_sales')
export class VehicleSale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Información del cliente
  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  ciudad: string;

  @Column()
  provincia: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column('text', { nullable: true })
  mensaje?: string;

  // Información básica del vehículo a vender
  @Column()
  vehiculoMarca: string;

  @Column()
  vehiculoModelo: string;

  @Column('int')
  vehiculoAnio: number;

  @Column({ nullable: true })
  vehiculoKilometraje?: string;

  @Column({ nullable: true })
  vehiculoCombustible?: string;

  @Column({ nullable: true })
  vehiculoTransmision?: string;

  @Column('text', { nullable: true })
  vehiculoDescripcion?: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioEsperado?: number;

  @Column({ default: false })
  procesado: boolean;

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;
}
