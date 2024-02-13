import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../user-type/entities/user-type.entity';

@Entity()
export class StoreFlorist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column('decimal', { precision: 10, scale: 6 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 6 })
  lng: number;

  @Column()
  name: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  usuario: Usuario;
}
