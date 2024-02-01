// src/dto/create-esquela.dto.ts

import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateEsquelaDto {
  @IsNotEmpty()
  @IsString({ message: 'Nombre debe ser un string' })
  @MaxLength(30, { message: 'Nombre no puede tener más de 30 caracteres' })
  nombre: string;

  @IsNotEmpty()
  @IsString({ message: 'Apellido debe ser un string' })
  @MaxLength(30, { message: 'Apellido no puede tener más de 30 caracteres' })
  apellido: string;

  @IsOptional()
  @IsString({ message: 'Tanatorio debe ser un string' })
  @MaxLength(30, { message: 'Tanatorio no puede tener más de 30 caracteres' })
  tanatorio?: string;

  @IsOptional()
  @IsArray({ message: 'Floristerias debe ser un array de números' })
  @IsNumber(
    {},
    { each: true, message: 'Cada elemento de Floristerias debe ser un número' },
  )
  floristerias?: number[];

  @IsNotEmpty({ message: 'Direccion no puede ser nula' })
  @IsString({ message: 'Direccion debe ser un string' })
  direccion: string;

  @IsOptional()
  @IsString({ message: 'Fecha debe ser un string' })
  fecha?: string;

  @IsOptional()
  @IsString({ message: 'Hora debe ser un string' })
  hora?: string;

  @IsOptional()
  @IsString({ message: 'Texto1 debe ser un string' })
  @MaxLength(250, { message: 'Texto1 no puede tener más de 250 caracteres' })
  texto1?: string;

  @IsOptional()
  @IsString({ message: 'Texto2 debe ser un string' })
  @MaxLength(250, { message: 'Texto2 no puede tener más de 250 caracteres' })
  texto2?: string;

  @IsOptional()
  @IsString({ message: 'Texto3 debe ser un string' })
  @MaxLength(250, { message: 'Texto3 no puede tener más de 250 caracteres' })
  texto3?: string;

  @IsOptional()
  @IsString({ message: 'Texto4 debe ser un string' })
  @MaxLength(500, { message: 'Texto4 no puede tener más de 500 caracteres' })
  texto4?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Foto debe ser una URL válida' })
  foto?: string;

  @IsNotEmpty({ message: 'Link no puede ser nulo' })
  @IsUrl({}, { message: 'Link debe ser una URL válida' })
  link: string;

  @IsNotEmpty({ message: 'Documento no puede ser nulo' })
  @IsString({ message: 'Documento debe ser un string' })
  documento: string;
}
