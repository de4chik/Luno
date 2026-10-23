import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString({ message: 'Name of brand must be a string' })
  @IsNotEmpty({ message: 'Name of rand is not empty' })
  name: string;
}
