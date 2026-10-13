import { Module } from '@nestjs/common';
import { JsonwebtokenService } from './jsonwebtoken.service.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [JsonwebtokenService],
  exports: [JsonwebtokenService],
  imports: [JwtModule.register({ global: true })],
})
export class JsonwebtokenModule {}
