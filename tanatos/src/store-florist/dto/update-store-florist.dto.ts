import { IsOptional, IsString, IsNumber } from 'class-validator';
import { StoreFloristUpdateDto } from '../../user-type/dto/store-florist.dto';

export class UpdateStoreFloristDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  user_id?: number;

  stores?: StoreFloristUpdateDto[]; // Puedes permitir que stores sea opcional para la actualización también, si deseas
}
