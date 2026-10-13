import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JsonwebtokenModule } from '../jsonwebtoken/jsonwebtoken.module.ts';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JsonwebtokenModule],
})
export class AuthModule {}
