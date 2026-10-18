import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.ts';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAll() {
    return this.categoryService.findAll();
  }

  @Get('by-id/:id')
  getById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Get('by-name/:name')
  getByName(@Param('name') name: string) {
    return this.categoryService.findByName(name);
  }

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.categoryService.create(createProductDto);
  }

  @Patch('update/:id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return this.categoryService.update(updateProductDto, id);
  }
}
