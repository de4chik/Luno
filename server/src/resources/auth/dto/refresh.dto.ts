import { IsJWT, IsString } from 'class-validator';

export class RefreshDto {
  @IsString({ message: 'Token must be a string' })
  @IsJWT({ message: 'Invalid format token' })
  refreshToken: string;
}
