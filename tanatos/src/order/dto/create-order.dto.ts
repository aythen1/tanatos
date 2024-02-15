import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { OrderStatus } from './order-status.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsArray()
  readonly items: any[];

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  readonly total_amount: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly sympathy_text: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  readonly status?: OrderStatus;

  @IsNotEmpty()
  @IsNumber()
  cliente_id: number;

  @IsNotEmpty()
  @IsNumber()
  store_id: number;

  @IsOptional()
  @IsNumber()
  esquela_id: number;
}
