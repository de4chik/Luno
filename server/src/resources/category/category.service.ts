import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.ts';
import { Prisma } from '../../generated/prisma/client.ts';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const fondCategory = await this.findByName(createProductDto.name);
    if (fondCategory) {
      throw new ConflictException('This category alredy exist');
    }
    return await this.prisma.category.create({ data: createProductDto });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async update(updateProductDto: UpdateProductDto, id: string) {
    const fondCategory = await this.findById(id);
    if (!fondCategory) {
      throw new NotFoundException('This category not found');
    }
    return await this.prisma.category.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async findById(id: string) {
    try {
      return await this.prisma.category.findUnique({ where: { id } });
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
}
