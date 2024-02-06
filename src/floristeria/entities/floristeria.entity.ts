// src/entities/floristeria.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { PedidoEntity } from '../../pedido/entities/pedido.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
  Max,
} from 'class-validator';

@Entity('floristerias')
export class FloristeriaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, nullable: false })
  @Length(3, 40, {
    message:
      'El nombre de usuario de la floristería debe tener entre 3 y 40 caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre de usuario de la floristería es obligatorio',
  })
  userFlower: string;

  @Column({ length: 100, nullable: false })
  @Length(10, 100, {
    message:
      'El correo electrónico de la floristería debe tener entre 10 y 100 caracteres',
  })
  @IsEmail(
    {},
    { message: 'El correo electrónico de la floristería no es válido' },
  )
  @IsNotEmpty({
    message: 'El correo electrónico de la floristería es obligatorio',
  })
  email: string;

  @Column({ length: 20, nullable: false })
  @Length(1, 20, {
    message:
      'El número de teléfono de la floristería debe tener entre 1 y 20 caracteres',
  })
  @IsNotEmpty({
    message: 'El número de teléfono de la floristería es obligatorio',
  })
  phone: string;

  @Column({ length: 255, nullable: true })
  @Length(0, 500, {
    message: 'La foto de la floristería no puede tener más de 500 caracteres',
  })
  @IsOptional()
  photo: string;

  @Column({ length: 100, nullable: false })
  @Length(8, 100, {
    message:
      'La contraseña de la floristería debe tener entre 8 y 100 caracteres',
  })
  @IsString({
    message: 'La contraseña de la floristería debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La contraseña de la floristería es obligatoria' })
  password: string;

  @Column({ default: 0, nullable: true })
  @Min(0, { message: 'El stock de la floristería no puede ser menor que 0' })
  @Max(10000, {
    message: 'El stock de la floristería no puede ser mayor que 10000',
  })
  stock: number;

  //   // Relación con la entidad PedidoEntity
  //   @OneToMany(() => PedidoEntity, (pedido) => pedido.floristeria)
  //   pedidos: PedidoEntity[];
}
