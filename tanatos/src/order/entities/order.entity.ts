// order.entity.ts

import { Funeral } from 'src/funeral/entities/funeral.entity';
import { StoreFlorist } from 'src/store-florist/entities/store-florist.entity';
import { Usuario } from 'src/user-type/entities/user-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb' })
  items: any[]; // Se asume que es un array de objetos JSON

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  address: string;

  @Column()
  sympathy_text: string;

  @Column({ default: 'pending' })
  status: string; // pending, completed, cancelled, accepted

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  cliente: Usuario;

  @ManyToOne(() => StoreFlorist)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: StoreFlorist;

  @ManyToOne(() => Funeral)
  @JoinColumn({ name: 'esquela_id', referencedColumnName: 'id' })
  esquela: Funeral;
}
