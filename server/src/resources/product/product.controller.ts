import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.ts';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('all')
  getAll() {
    return this.productService.findAll();
  }

  @Get('by-id/:id')
  getById(@Param('id') id: string) {
    return this.productService.findById(id);
  }
}
