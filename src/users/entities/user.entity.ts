// src/users/entities/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { PedidosEntity } from '../../pedidos/entities/pedidos.entity';
// import { TransactionsEntity } from '../../transactions/entities/transactions.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  // @OneToMany(() => PedidosEntity, pedido => pedido.user)
  // pedidos: PedidosEntity[];

  // @OneToMany(() => TransactionsEntity, transaction => transaction.user)
  // transactions: TransactionsEntity[];
}
