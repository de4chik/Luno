import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender, Prisma } from '../../../generated/prisma/client.ts';

export class CreateProductVariantDto {
  @IsString({ message: 'Size must be a string' })
  @IsNotEmpty({ message: 'Size is required' })
  @MaxLength(10, { message: 'Max length for size is 10 characters' })
  size: string;

  @IsInt({ message: 'Quantity must be an integer number' })
  @Min(0, { message: 'Quantity cannot be less than 0' })
  @Max(999, { message: 'Quantity is too large' })
  quantity: number;
}

export class CreateProductDto {
  @IsString({ message: 'Name of product must be a string' })
  @IsNotEmpty({ message: 'Name of producuct is not empty' })
  @MaxLength(64, { message: 'Max length name of product is 64' })
  name: string;

  @IsString({ message: 'Description of product must be a string' })
  @IsNotEmpty({ message: 'Description of producuct is not empty' })
  @MaxLength(255, { message: 'Max length description of product is 255' })
  description: string;

  @IsInt({ message: 'Old price of product must be a number' })
  @IsNotEmpty({ message: 'Old price of producuct is not empty' })
  @Min(0, { message: 'Old price cannot be negative' })
  @Max(99999999, { message: 'Old price is too large (max 8 digits)' })
  oldPrice: number;

  @IsInt({ message: 'Price of product must be a number' })
  @IsNotEmpty({ message: 'Price of producuct is not empty' })
  @Min(0, { message: 'Price cannot be negative' })
  @Max(99999999, { message: 'Price is too large (max 8 digits)' })
  price: number;

  @IsArray({ message: 'Images must be a array with string' })
  @ArrayMinSize(1, { message: 'At least one image must be uploaded' })
  @ArrayMaxSize(5, { message: 'There can be a maximum of 5 images.' })
  @IsString({ message: 'Image mest be a string', each: true })
  images: string[];

  @IsString({ message: 'Color of product must be a string' })
  @IsNotEmpty({ message: 'Color of producuct is not empty' })
  @MaxLength(40, { message: 'Max length color of product is 40' })
  color: string;

  @IsObject({ message: 'Compound must be an object' })
  @IsNotEmpty({ message: 'compound of producuct is not empty' })
  compound: Prisma.InputJsonValue;

  @IsUUID('4', { message: 'Brand id of product must be a uuid type' })
  @IsNotEmpty({ message: 'Brand id of producuct is not empty' })
  brandId: string;

  @IsUUID('4', { message: 'Category id of product must be a uuid type' })
  @IsNotEmpty({ message: 'Category id of producuct is not empty' })
  categoryId: string;

  @IsEnum(Gender, {
    message: 'The gender must be one of the following values: Man, Woman, Kids',
  })
  @IsNotEmpty({ message: 'gender id of producuct is not empty' })
  gender: Gender;

  @IsArray({ message: 'Product variants must be an array' })
  @ArrayMinSize(1, { message: 'At least one product variant is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  productVariants: CreateProductVariantDto[];
}
