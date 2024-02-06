// src/dto/update-tanatorio.dto.ts

import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTanatorioDto {
  @IsOptional()
  @Length(3, 40, {
    message:
      'El nombre de usuario del tanatorio debe tener entre 3 y 40 caracteres',
  })
  userFuneral?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico del tanatorio no es válido' })
  @Length(10, 100, {
    message:
      'El correo electrónico del tanatorio debe tener entre 10 y 100 caracteres',
  })
  email?: string;

  @IsOptional()
  @IsString({
    message: 'El número de teléfono del tanatorio debe ser una cadena de texto',
  })
  @Length(1, 20, {
    message:
      'El número de teléfono del tanatorio debe tener entre 1 y 20 caracteres',
  })
  phone?: string;

  @IsOptional()
  @Length(0, 500, {
    message: 'La foto del tanatorio no puede tener más de 500 caracteres',
  })
  photo?: string;

  @IsOptional()
  @IsString({
    message: 'La contraseña del tanatorio debe ser una cadena de texto',
  })
  @Length(8, 100, {
    message: 'La contraseña del tanatorio debe tener entre 8 y 100 caracteres',
  })
  password?: string;
}
