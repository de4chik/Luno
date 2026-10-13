import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonwebtokenService {
  constructor(private readonly jwt: JwtService) {}
  async generate(id: string) {
    const payload = { id };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.ACCESS_JWT,
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.REFRESH_JWT,
    });

    return { accessToken, refreshToken };
  }
}
