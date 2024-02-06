// src/dto/create-tanatorio.dto.ts

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTanatorioDto {
  @IsNotEmpty({
    message: 'El nombre de usuario del tanatorio es obligatorio',
  })
  @Length(3, 40, {
    message:
      'El nombre de usuario del tanatorio debe tener entre 3 y 40 caracteres',
  })
  userFuneral: string;

  @IsNotEmpty({
    message: 'El correo electrónico del tanatorio es obligatorio',
  })
  @IsEmail({}, { message: 'El correo electrónico del tanatorio no es válido' })
  @Length(10, 100, {
    message:
      'El correo electrónico del tanatorio debe tener entre 10 y 100 caracteres',
  })
  email: string;

  @IsNotEmpty({
    message: 'El número de teléfono del tanatorio es obligatorio',
  })
  @IsString({
    message: 'El número de teléfono del tanatorio debe ser una cadena de texto',
  })
  @Length(1, 20, {
    message:
      'El número de teléfono del tanatorio debe tener entre 1 y 20 caracteres',
  })
  phone: string;

  @Length(0, 500, {
    message: 'La foto del tanatorio no puede tener más de 500 caracteres',
  })
  photo?: string;

  @IsNotEmpty({
    message: 'La contraseña del tanatorio es obligatoria',
  })
  @IsString({
    message: 'La contraseña del tanatorio debe ser una cadena de texto',
  })
  @Length(8, 100, {
    message: 'La contraseña del tanatorio debe tener entre 8 y 100 caracteres',
  })
  password: string;
}
