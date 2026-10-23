import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { CategoryModule } from '../category/category.module.ts';
import { BrandModule } from '../brand/brand.module.ts';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [CategoryModule, BrandModule],
})
export class ProductModule {}
