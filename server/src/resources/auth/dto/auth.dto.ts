import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
export class AuthDto {
  @IsEmail(
    {},
    {
      message: 'Invalid mail',
    },
  )
  @IsString({ message: 'Mail must be a string' })
  mail: string;

  @IsOptional()
  @IsInt({ message: 'Code must be a number' })
  code: number;
}
