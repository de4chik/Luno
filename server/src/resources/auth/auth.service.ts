import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { randomInt } from 'crypto';
import bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto.ts';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getCode(authDto: AuthDto) {
    //generate code and hash for code
    const generateCode = randomInt(1000, 9999).toString();
    const codeHash = bcrypt.hashSync(generateCode, 10);

    //generate 5 min for code
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.phoneVerification.upsert({
      where: { phone: authDto.phone },
      create: {
        phone: authDto.phone,
        expiresAt,
        codeHash,
      },
      update: {
        phone: authDto.phone,
        expiresAt,
        codeHash,
      },
    });

    return generateCode;
  }

  async verify(authDto: AuthDto) {
    const findCode = await this.prisma.phoneVerification.findUnique({
      where: { phone: authDto.phone },
    });
    if (!findCode) {
      throw new BadRequestException('Verification code not');
    }

    if (findCode.expiresAt < new Date()) {
      // await this.prisma.phoneVerification.delete({
      //   where: { phone: authDto.phone },
      // });

      throw new BadRequestException('Verification code has expired');
    }
    const isCodeValid = bcrypt.compareSync(
      authDto.code.toString(),
      findCode.codeHash,
    );
    if (!isCodeValid) {
      throw new BadRequestException('Invalid verification code');
    }

    const findUser = await this.prisma.user.upsert({
      where: { phone: authDto.phone },
      update: {},
      create: { phone: authDto.phone },
    });

    await this.prisma.phoneVerification.delete({
      where: { phone: authDto.phone },
    });

    return findUser;
  }
}
