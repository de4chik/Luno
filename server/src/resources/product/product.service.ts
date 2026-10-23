import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { CreateProductDto } from './dto/create-product.dto.ts';
import { BrandService } from '../brand/brand.service.ts';
import { CategoryService } from '../category/category.service.ts';
import { generateSku } from '../../services/sku.service.ts';

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

  async findAll(limit: [number, number] = [0, 10]) {
    return await this.prisma.product.findMany({
      skip: limit[0],
      take: limit[1],
    });
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
    return await this.prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        productVariants: true,
      },
    });
  }

  async findBySku(sku: string) {
    return await this.prisma.product.findUnique({
      where: { sku },
      include: {
        brand: true,
        productVariants: true,
      },
    });
  }

  async findByBrand(brandName: string, limit: [number, number] = [0, 10]) {
    return await this.prisma.product.findMany({
      where: {
        brand: {
          name: brandName,
        },
      },
      skip: limit[0],
      take: limit[1],
    });
  }

  async findByCategory(
    categoryName: string,
    limit: [number, number] = [0, 10],
  ) {
    return await this.prisma.product.findMany({
      where: {
        category: {
          name: categoryName,
        },
      },
      skip: limit[0],
      take: limit[1],
    });
  }
}
