import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { OperationTypesEnum } from '../constants/operation-types.enum';

export class CreateOperationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  latitude?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  longitude?: number;

  @IsEnum({ enum: OperationTypesEnum })
  type: OperationTypesEnum;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  transports: number[];
}
