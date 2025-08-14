import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { Video } from './video.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column({ default: 'auto' })
  tipo: string;

  @Column('int')
  anio: number;

  @Column('decimal', { precision: 12, scale: 2 })
  precio: number;

  @Column('text')
  descripcion: string;

  @Column({ default: false })
  destacado: boolean;

  // Información básica adicional
  @Column({ nullable: true })
  kilometraje?: string;

  @Column({ nullable: true, type: 'text' })
  observaciones?: string;

  // Motor
  @Column({ nullable: true })
  combustible?: string;

  @Column({ nullable: true })
  cilindrada?: string;

  @Column({ nullable: true })
  potencia?: string;

  @Column({ nullable: true })
  alimentacion?: string;

  @Column({ nullable: true, type: 'int' })
  cilindros?: number;

  @Column({ nullable: true, type: 'int' })
  valvulas?: number;

  // Transmisión y chasis
  @Column({ nullable: true })
  traccion?: string;

  @Column({ nullable: true })
  transmision?: string;

  @Column({ nullable: true })
  velocidades?: string;

  @Column({ nullable: true })
  neumaticos?: string;

  @Column({ nullable: true })
  frenosDelanteros?: string;

  @Column({ nullable: true })
  frenosTraseros?: string;

  @Column({ default: false })
  direccionAsistida: boolean;

  @Column({ nullable: true })
  direccionAsistidaTipo?: string;

  // Equipamiento - Confort
  @Column({ default: false })
  aireAcondicionado: boolean;

  @Column({ default: false })
  asientoDelanteroAjuste: boolean;

  @Column({ default: false })
  volanteRegulable: boolean;

  @Column({ nullable: true })
  asientosTraseros?: string;

  @Column({ nullable: true })
  tapizados?: string;

  @Column({ nullable: true })
  cierrePuertas?: string;

  @Column({ nullable: true })
  vidriosDelanteros?: string;

  @Column({ nullable: true })
  vidriosTraseros?: string;

  @Column({ nullable: true })
  espejosExteriores?: string;

  @Column({ default: false })
  farosAntiniebla: boolean;

  @Column({ default: false })
  computadoraBordo: boolean;

  @Column({ default: false })
  llantasAleacion: boolean;

  @Column({ default: false })
  camaraEstacionamiento: boolean;

  @Column({ default: false })
  asistenciaArranquePendientes: boolean;

  @Column({ default: false })
  controlEconomiaCombustible: boolean;

  @Column({ default: false })
  luzDiurna: boolean;

  // Equipamiento - Seguridad
  @Column({ default: false })
  abs: boolean;

  @Column({ default: false })
  distribucionElectronicaFrenado: boolean;

  @Column({ default: false })
  asistenciaFrenadaEmergencia: boolean;

  @Column({ default: false })
  airbagsDelanteros: boolean;

  @Column({ nullable: true })
  airbagsCortina?: string;

  @Column({ default: false })
  airbagRodillaConductor: boolean;

  @Column({ nullable: true })
  airbagsLaterales?: string;

  @Column({ default: false })
  alarma: boolean;

  @Column({ default: false })
  inmovilizadorMotor: boolean;

  @Column({ default: false })
  anclajeAsientosInfantiles: boolean;

  @Column({ default: false })
  autobloqueoPuertas: boolean;

  @Column({ default: false })
  controlEstabilidad: boolean;

  @Column({ default: false })
  controlTraccion: boolean;

  @Column({ nullable: true, type: 'int' })
  cantidadAirbags?: number;

  // Comunicación y entretenimiento
  @Column({ nullable: true })
  equipoMusica?: string;

  @Column({ default: false })
  comandosVolante: boolean;

  @Column({ default: false })
  conexionAuxiliar: boolean;

  @Column({ default: false })
  conexionUSB: boolean;

  @Column({ default: false })
  interfazBluetooth: boolean;

  @Column({ default: false })
  controlVozDispositivos: boolean;

  @Column({ default: false })
  pantalla: boolean;

  @Column({ default: false })
  sistemaNavegacionGPS: boolean;

  @Column({ default: false })
  appleCarPlay: boolean;

  @Column({ default: false })
  mirrorlink: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => Image, (image) => image.vehicle, { cascade: true })
  images: Image[];

  @OneToMany(() => Video, (video) => video.vehicle, { cascade: true })
  videos: Video[];
}
