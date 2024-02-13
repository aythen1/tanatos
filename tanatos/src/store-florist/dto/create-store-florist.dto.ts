import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { StoreFloristCreateDto } from '../../user-type/dto/store-florist.dto';

export class CreateStoreFloristDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  stores?: StoreFloristCreateDto[]; // Haciendo que stores sea opcional para la creación
}
