import { TransportTypes } from '../constants/transport-types.enum';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransportDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  peopleCapacity: number;

  @IsEnum(TransportTypes)
  type: TransportTypes;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}
