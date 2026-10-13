import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/auth.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('code')
  getCode(@Body() authDto: AuthDto) {
    return this.authService.getCode(authDto);
  }

  @Post('verify')
  verify(@Body() authDto: AuthDto) {
    return this.authService.verify(authDto);
  }
}
