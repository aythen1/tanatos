// src/dto/create-pedido.dto.ts

import {
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsOptional,
  IsBoolean,
  IsDecimal,
} from 'class-validator';

export class CreatePedidoDto {
  @IsString({ message: 'El nombre de la esquela debe ser una cadena' })
  @MinLength(5, {
    message: 'El nombre de la esquela debe tener al menos 5 caracteres',
  })
  @MaxLength(40, {
    message: 'El nombre de la esquela no debe tener más de 40 caracteres',
  })
  nameEsquela: string;

  @IsString({ message: 'El nombre del usuario debe ser una cadena' })
  @MinLength(5, {
    message: 'El nombre del usuario debe tener al menos 5 caracteres',
  })
  @MaxLength(40, {
    message: 'El nombre del usuario no debe tener más de 40 caracteres',
  })
  nameUser: string;

  @IsOptional()
  @IsString({ message: 'La sala debe ser una cadena' })
  @MaxLength(10, { message: 'La sala no debe tener más de 10 caracteres' })
  room?: string;

  @IsString({ message: 'El teléfono del usuario debe ser una cadena' })
  @MaxLength(20, {
    message: 'El teléfono del usuario no debe tener más de 20 caracteres',
  })
  @IsPhoneNumber(null, { message: 'Número de teléfono inválido' })
  phoneUser: string;

  @IsString({ message: 'El nombre de la floristería debe ser una cadena' })
  @MaxLength(50, {
    message: 'El nombre de la floristería no debe tener más de 50 caracteres',
  })
  florist: string;

  @IsOptional()
  @IsString({ message: 'El nombre de la funeraria debe ser una cadena' })
  @MaxLength(50, {
    message: 'El nombre de la funeraria no debe tener más de 50 caracteres',
  })
  funeral?: string;

  @IsString({ message: 'El nombre del producto debe ser una cadena' })
  @MaxLength(100, {
    message: 'El nombre del producto no debe tener más de 100 caracteres',
  })
  product: string;

  @IsString({ message: 'La dirección debe ser una cadena' })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  @MaxLength(100, {
    message: 'La dirección no debe tener más de 100 caracteres',
  })
  direccion: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo de pago debe ser un valor booleano' })
  pay?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'El campo de nota debe ser un valor booleano' })
  note?: boolean;

  @IsOptional()
  @IsString({ message: 'El texto debe ser una cadena' })
  @MaxLength(500, { message: 'El texto no debe tener más de 500 caracteres' })
  text?: string;

  @IsString({ message: 'El precio debe ser una cadena numérica' })
  @IsDecimal(
    { decimal_digits: '2', force_decimal: false },
    { message: 'El precio debe ser un número válido' },
  )
  @MaxLength(30, { message: 'El precio no debe tener más de 30 caracteres' })
  price: string;

  @IsOptional()
  @IsString({ message: 'La factura debe ser una cadena' })
  bill?: string;
}
