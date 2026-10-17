import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { randomInt } from 'crypto';
import bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto.ts';
import { JsonwebtokenService } from '../jsonwebtoken/jsonwebtoken.service.ts';
import { Mailer } from '../../utils/send.util.ts';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jsonwebtoken: JsonwebtokenService,
  ) {}

  async getCode(authDto: AuthDto) {
    //generate code and hash for code
    const generateCode = randomInt(1000, 9999).toString();
    const codeHash = bcrypt.hashSync(generateCode, 10);

    //generate 5 min for code
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.mailVerification.upsert({
      where: { mail: authDto.mail },
      create: {
        mail: authDto.mail,
        expiresAt,
        codeHash,
      },
      update: {
        mail: authDto.mail,
        expiresAt,
        codeHash,
      },
    });
    await Mailer.sendCode(authDto.mail, generateCode);
    return 'Code sent to your email';
  }

  async verify(authDto: AuthDto) {
    const findCode = await this.prisma.mailVerification.findUnique({
      where: { mail: authDto.mail },
    });
    if (!findCode) {
      throw new BadRequestException('Wrong email');
    }

    if (findCode.expiresAt < new Date()) {
      await this.prisma.mailVerification.delete({
        where: { mail: authDto.mail },
      });
      throw new BadRequestException('Verification code has expired');
    }
    const isCodeValid = bcrypt.compareSync(
      authDto.code.toString(),
      findCode.codeHash,
    );
    if (!isCodeValid) {
      throw new BadRequestException('Invalid verification code');
    }

    const user = await this.prisma.user.upsert({
      where: { mail: authDto.mail },
      update: {},
      create: { mail: authDto.mail },
    });

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const tokens = await this.jsonwebtoken.generate(user.id);
    await this.prisma.session.create({
      data: {
        token: tokens.refreshToken,
        expiresAt,
        userId: user.id,
      },
    });
    await this.prisma.mailVerification.delete({
      where: { mail: authDto.mail },
    });

    return { user, tokens };
  }

  async profile(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('user unauthorized ');
    }
    return user;
  }

  async refresh(token: string) {
    console.log(token);

    const session = await this.prisma.session.findFirst({
      where: {
        token: token,
      },
    });
    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = await this.jsonwebtoken.generate(session.userId);

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const newSession = await this.prisma.session.updateMany({
      where: {
        id: session.id,
        token: token,
        expiresAt: { gt: new Date() },
      },
      data: {
        token: tokens.refreshToken,
        expiresAt,
      },
    });

    if (newSession.count !== 1) {
      throw new UnauthorizedException('Refresh token has already been used');
    }

    return { ...tokens };
  }
}
