import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/auth.dto.ts';
import { AuthGuard } from './guard/auth.guard.ts';
import type { Request } from 'express';
import { RefreshDto } from './dto/refresh.dto.ts';

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

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() request: Request) {
    return this.authService.profile(request.userId!);
  }

  @Post('refresh')
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
