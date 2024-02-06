// src/dto/update-floristeria.dto.ts

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
  Max,
} from 'class-validator';

export class UpdateFloristeriaDto {
  @Length(3, 40, {
    message:
      'El nombre de usuario de la floristería debe tener entre 3 y 40 caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre de usuario de la floristería es obligatorio',
  })
  @IsOptional()
  userFlower?: string;

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
  @IsOptional()
  email?: string;

  @Length(1, 20, {
    message:
      'El número de teléfono de la floristería debe tener entre 1 y 20 caracteres',
  })
  @IsNotEmpty({
    message: 'El número de teléfono de la floristería es obligatorio',
  })
  @IsOptional()
  phone?: string;

  @Length(0, 500, {
    message: 'La foto de la floristería no puede tener más de 500 caracteres',
  })
  @IsOptional()
  photo?: string;

  @Length(8, 100, {
    message:
      'La contraseña de la floristería debe tener entre 8 y 100 caracteres',
  })
  @IsString({
    message: 'La contraseña de la floristería debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La contraseña de la floristería es obligatoria' })
  @IsOptional()
  password?: string;

  @Min(0, { message: 'El stock de la floristería no puede ser menor que 0' })
  @Max(10000, {
    message: 'El stock de la floristería no puede ser mayor que 10000',
  })
  @IsOptional()
  stock?: number;
}
