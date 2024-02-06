// src/entities/tanatorio.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EsquelaEntity } from '../../esquela/entities/esquela.entity';
// import { PedidoEntity } from '../../pedido/entities/pedido.entity';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@Entity('tanatorios')
export class TanatorioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, nullable: false })
  @Length(3, 40, {
    message:
      'El nombre de usuario del tanatorio debe tener entre 3 y 40 caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre de usuario del tanatorio es obligatorio',
  })
  userFuneral: string;

  @Column({ length: 100, nullable: false })
  @Length(10, 100, {
    message:
      'El correo electrónico del tanatorio debe tener entre 10 y 100 caracteres',
  })
  @IsString({
    message: 'El correo electrónico del tanatorio debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El correo electrónico del tanatorio es obligatorio',
  })
  email: string;

  @Column({ length: 20, nullable: false })
  @Length(1, 20, {
    message:
      'El número de teléfono del tanatorio debe tener entre 1 y 20 caracteres',
  })
  @IsNotEmpty({
    message: 'El número de teléfono del tanatorio es obligatorio',
  })
  phone: string;

  @Column({ length: 255, nullable: true })
  @Length(0, 500, {
    message: 'La foto del tanatorio no puede tener más de 500 caracteres',
  })
  photo: string;

  @Column({ length: 100, nullable: false })
  @Length(8, 100, {
    message: 'La contraseña del tanatorio debe tener entre 8 y 100 caracteres',
  })
  @IsString({
    message: 'La contraseña del tanatorio debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'La contraseña del tanatorio es obligatoria',
  })
  password: string;

  @OneToMany(() => EsquelaEntity, (esquela) => esquela.tanatorio)
  esquelas: EsquelaEntity[];

  //   @OneToMany(() => PedidoEntity, (pedido) => pedido.tanatorio)
  //   pedidos: PedidoEntity[];
}
