// src/dto/update-pedido.dto.ts

import {
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
  IsString,
  Length,
  IsDecimal,
  MaxLength,
  IsIn,
} from 'class-validator';

export class UpdatePedidoDto {
  @IsOptional()
  @IsString({ message: 'El nombre de la esquela debe ser un texto' })
  @Length(5, 40, {
    message: 'El nombre de la esquela debe tener entre 5 y 40 caracteres',
  })
  nameEsquela?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del usuario debe ser un texto' })
  @Length(5, 40, {
    message: 'El nombre del usuario debe tener entre 5 y 40 caracteres',
  })
  nameUser?: string;

  @IsOptional()
  @IsString({ message: 'La sala debe ser un texto' })
  @MaxLength(10, { message: 'La sala no puede tener más de 10 caracteres' })
  room?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono del usuario debe ser un texto' })
  @Length(1, 20, {
    message: 'El teléfono del usuario debe tener entre 1 y 20 caracteres',
  })
  @IsPhoneNumber(null, { message: 'Número de teléfono inválido', each: false })
  phoneUser?: string;

  @IsOptional()
  @IsString({ message: 'El nombre de la floristería debe ser un texto' })
  @MaxLength(50, {
    message: 'El nombre de la floristería no puede tener más de 50 caracteres',
  })
  florist?: string;

  @IsOptional()
  @IsString({ message: 'El nombre de la funeraria debe ser un texto' })
  @MaxLength(50, {
    message: 'El nombre de la funeraria no puede tener más de 50 caracteres',
  })
  funeral?: string;

  @IsOptional()
  @IsString({ message: 'El producto debe ser un texto' })
  @MaxLength(100, {
    message: 'El producto no puede tener más de 100 caracteres',
  })
  product?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto' })
  @Length(5, 100, {
    message: 'La dirección debe tener entre 5 y 100 caracteres',
  })
  direccion?: string;

  @IsOptional()
  @IsIn(['solicitado', 'cancelado', 'listo', 'finalizado'])
  state?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo de pago debe ser un valor booleano' })
  pay?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo de nota debe ser un valor booleano' })
  note?: boolean;

  @IsOptional()
  @IsString({ message: 'El texto debe ser un texto' })
  @MaxLength(500, { message: 'El texto no puede tener más de 500 caracteres' })
  text?: string;

  @IsOptional()
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El precio debe ser un número decimal con hasta 2 decimales' },
  )
  price?: string;

  @IsOptional()
  @IsString({ message: 'La factura debe ser un texto' })
  @MaxLength(30, { message: 'La factura no puede tener más de 30 caracteres' })
  bill?: string;
}
