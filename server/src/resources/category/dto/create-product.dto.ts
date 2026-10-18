import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name of category must be a string' })
  @IsNotEmpty({ message: 'Name of category is not empty' })
  name: string;
}
