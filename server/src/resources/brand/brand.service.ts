import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';
import { Prisma } from '../../generated/prisma/client.ts';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    const findBrand = await this.findByName(createBrandDto.name);
    if (findBrand) {
      throw new ConflictException('This brand alredy exist');
    }
    return await this.prisma.brand.create({ data: createBrandDto });
  }

  async findAll() {
    return await this.prisma.brand.findMany();
  }

  async update(updateBrandDto: UpdateBrandDto, id: string) {
    await this.findById(id);
    return await this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async findById(id: string) {
    try {
      const findBrand = await this.prisma.brand.findUnique({ where: { id } });
      if (!findBrand) {
        throw new NotFoundException('Brand not found');
      }
      return findBrand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2007') {
          throw new BadRequestException('Error validation data');
        }
      }
    }
  }

  async findByName(name: string) {
    return await this.prisma.brand.findUnique({ where: { name } });
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.prisma.brand.delete({
      where: { id },
    });
  }
}
