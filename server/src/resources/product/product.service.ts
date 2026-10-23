import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { CreateProductDto } from './dto/create-product.dto.ts';
import { BrandService } from '../brand/brand.service.ts';
import { CategoryService } from '../category/category.service.ts';
import slugify from 'slugify';
import { generateSku } from '../../services/sku.service.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly brand: BrandService,
    private readonly category: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { productVariants, ...productData } = createProductDto;
    const category = await this.category.findById(createProductDto.categoryId);
    const brand = await this.brand.findById(createProductDto.brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const slug =
      `${category?.name.toLowerCase()}-${brand?.name.toLowerCase()}-${productData.name.toLowerCase()}-${productData.color.toLowerCase()}`.replace(
        /\s+/g,
        '-',
      );
    const sku = generateSku(
      brand?.name ?? '',
      category?.name ?? '',
      '26',
      productData.color,
    );
    return await this.prisma.product.create({
      data: {
        ...productData,
        productVariants: {
          createMany: {
            data: productVariants,
          },
        },
        sku,
        slug,
      },
      include: {
        productVariants: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findById(id: string) {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        productVariants: true,
      },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        productVariants: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { productVariants, ...productData } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: productData,
      include: {
        productVariants: true,
      },
    });
  }
}
