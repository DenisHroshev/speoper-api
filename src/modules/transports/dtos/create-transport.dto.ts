import { TransportTypes } from '../constants/transport-types.enum';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransportDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  peopleCapacity: number;

  @IsEnum(TransportTypes)
  type: TransportTypes;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}
