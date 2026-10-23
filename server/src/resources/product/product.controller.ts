import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.ts';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  getAll(@Query('limit') limit: string) {
    return this.productService.findAll([
      Number(limit.split(',')[0]),
      Number(limit.split(',')[1]),
    ]);
  }

  @Get('by-id/:id')
  getById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('by-slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get('by-sku/:sku')
  getBySku(@Param('sku') sku: string) {
    return this.productService.findBySku(sku);
  }

  @Get('by-brand/:brand')
  getByBrand(@Param('brand') brand: string, @Query('limit') limit: string) {
    return this.productService.findByBrand(brand, [
      Number(limit.split(',')[0]),
      Number(limit.split(',')[1]),
    ]);
  }

  @Get('by-category/:category')
  getByCategory(@Param('category') category: string, @Query('limit') limit: string) {
    return this.productService.findByCategory(category, [
      Number(limit.split(',')[0]),
      Number(limit.split(',')[1]),
    ]);
  }
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
