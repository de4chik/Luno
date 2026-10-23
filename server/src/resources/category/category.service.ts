import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { updateCategoryDto } from './dto/update-category.dto.ts';
import { Prisma } from '../../generated/prisma/client.ts';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const fondCategory = await this.findByName(createCategoryDto.name);
    if (fondCategory) {
      throw new ConflictException('This category alredy exist');
    }
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async update(updateCategoryDto: updateCategoryDto, id: string) {
    await this.findById(id);
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async findById(id: string) {
    try {
      return await this.prisma.category.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2007') {
          throw new BadRequestException('Error validation data');
        }
      }
    }
  }

  async findByName(name: string) {
    return await this.prisma.category.findUnique({ where: { name } });
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
