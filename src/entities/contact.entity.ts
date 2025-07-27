import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('text')
  mensaje: string;

  @CreateDateColumn({ name: 'creadoEn' })
  creadoEn: Date;
}
