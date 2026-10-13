import { IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
export class AuthDto {
  @IsPhoneNumber(undefined, {
    message: 'Invalid phone number',
  })
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @IsOptional()
  @IsInt({ message: 'Code must be a number' })
  code: number;
}
