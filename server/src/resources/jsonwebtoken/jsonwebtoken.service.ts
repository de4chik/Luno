import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonwebtokenService {
  constructor(private readonly jwt: JwtService) {}
  async generate(id: string) {
    const payload = { id };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.ACCESS_JWT,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.REFRESH_JWT,
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async verify(token: string) {
    const payload = (await this.jwt.verifyAsync(token, {
      secret: process.env.ACCESS_JWT,
    })) as { id: string };

    return payload;
  }
}
