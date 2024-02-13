import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-user-type.dto';
import { IsString, MaxLength, IsOptional } from 'class-validator';
import { StoreFloristCreateDto } from './store-florist.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString({ message: 'Name should be a string' })
  @MaxLength(30, { message: 'Name should be at most 30 characters long' })
  name: string;

  @IsString({ message: 'Password should be a string' })
  @MaxLength(25, { message: 'Password should be at most 25 characters long' })
  password: string;

  @IsString({ message: 'Email should be a string' })
  @MaxLength(50, { message: 'Email should be at most 50 characters long' })
  email: string;

  @IsString({ message: 'Phone should be a string' })
  @MaxLength(20, { message: 'Phone should be at most 20 characters long' })
  phone: string;

  @IsString({ message: 'City should be a string' })
  @MaxLength(25, { message: 'City should be at most 25 characters long' })
  @IsOptional()
  city?: string;

  @IsString({ message: 'Country should be a string' })
  @MaxLength(50, { message: 'Country should be at most 50 characters long' })
  @IsOptional()
  country?: string;

  gender?: string;
  dob?: string;
  photo?: string; // Agregar photo como propiedad opcional

  oldPassword?: string;
  newPassword?: string;
  stores?: StoreFloristCreateDto[];
}
