import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Usuario } from '../../user-type/entities/user-type.entity';
import { Order } from 'src/order/entities/order.entity';

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

  // Relación con el usuario que creó la tienda
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  usuario: Usuario;

  // Relación muchos a muchos con los usuarios que son clientes de la tienda
  @ManyToMany(() => Usuario)
  @JoinTable({
    name: 'store_florist_clients',
    joinColumn: { name: 'store_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'client_id', referencedColumnName: 'id' },
  })
  clients: Usuario[];

  // Relación uno a muchos con los pedidos relacionados con la tienda
  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];
}
