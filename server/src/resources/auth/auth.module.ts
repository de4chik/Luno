import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JsonwebtokenModule } from '../jsonwebtoken/jsonwebtoken.module.ts';
import { MailerModule } from '../mailer/mailer.module.ts';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JsonwebtokenModule, MailerModule],
})
export class AuthModule {}
