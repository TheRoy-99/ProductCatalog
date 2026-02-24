import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString() name!: string;
  @IsString() productNumber!: string;
  @IsString() color!: string;
  @IsNumber() standardPrice!: number;
  @IsNumber() listPrice!: number;
  @IsString() size!: string;
  @IsString() weight!: string;
  @IsUUID() categoryId!: string;
  @IsString() saleStartDate!: string;

  @IsOptional()
  @IsString()
  saleEndDate?: string;

  @IsEnum(['Activo', 'Descontinuado'])
  status!: string;
}
