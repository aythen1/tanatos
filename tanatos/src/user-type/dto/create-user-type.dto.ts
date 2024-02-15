// create-usuario.dto.ts

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { StoreFloristCreateDto } from '../../user-type/dto/store-florist.dto';

export class CreateUsuarioDto {
  // id: number; (podría omitirse si es generada automáticamente)

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string; // Nuevo campo para el número de teléfono

  @IsNotEmpty()
  @IsString()
  token: string; // Nuevo campo para el token de validación

  lat: number;

  lng: number;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsNotEmpty()
  @IsString()
  user_type: string;

  @IsOptional()
  old_password?: string;

  @IsOptional()
  stores?: StoreFloristCreateDto[];
}
