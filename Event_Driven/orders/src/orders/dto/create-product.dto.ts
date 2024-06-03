import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString({ each: true })
  @IsArray()
  size: string;

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
