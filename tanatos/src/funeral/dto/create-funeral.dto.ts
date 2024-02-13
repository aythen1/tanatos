import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateFuneralDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  starting_date: Date;

  @IsOptional()
  @IsDateString()
  starting_date1: Date;

  @IsNotEmpty()
  @IsString()
  timeFuneral: string;

  @IsNotEmpty()
  @IsString()
  timeCherch: string;

  @IsOptional()
  @IsString()
  account_type: string;

  @IsOptional()
  @IsBoolean()
  favorite: boolean;

  @IsOptional()
  @IsString()
  funeral_location: string;

  @IsOptional()
  @IsNumber()
  funeral_lat: number;

  @IsOptional()
  @IsNumber()
  funeral_lng: number;

  @IsOptional()
  @IsString()
  chruch_location: string;

  @IsOptional()
  @IsNumber()
  chruch_lat: number;

  @IsOptional()
  @IsNumber()
  chruch_lng: number;
}
