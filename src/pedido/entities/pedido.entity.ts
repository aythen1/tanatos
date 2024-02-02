// src/entities/pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, nullable: false })
  nameEsquela: string;

  @Column({ length: 40, nullable: false })
  nameUser: string;

  @Column({ length: 10, nullable: true })
  room: string;

  @Column({ length: 20, nullable: false })
  phoneUser: string;

  @Column({ length: 50, nullable: false })
  florist: string;

  @Column({ length: 50, nullable: true })
  funeral: string;

  @Column({ length: 100, nullable: false })
  product: string;

  @Column({ length: 100, nullable: false })
  direccion: string;

  @Column({ default: 'solicitado' })
  state: string;

  @Column({ default: false, nullable: true })
  pay: boolean;

  @Column({ default: false, nullable: true })
  note: boolean;

  @Column({ length: 500, nullable: true })
  text: string;

  @Column({ length: 30, nullable: false })
  price: string;

  @Column({ nullable: true })
  bill: string;
}
