import { Usuario } from 'src/user-type/entities/user-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Funeral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  account_type?: string;
  @Column({ type: 'boolean', nullable: true })
  favorite: boolean; // Cambiar a boolean

  @Column({ type: 'date' })
  funeral_date: Date;

  @Column({ type: 'time' })
  funeral_time: Date;

  @Column({ type: 'date' })
  church_date: Date;

  @Column({ type: 'time' })
  church_time: Date;

  @Column({ type: 'varchar', length: 255 })
  funeral_location: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  funeral_lat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  funeral_lng: number;

  @Column({ type: 'varchar', length: 255 })
  church_location: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  church_lat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  church_lng: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Usuario;
}
