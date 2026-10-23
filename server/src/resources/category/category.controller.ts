import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.ts';
import { updateCategoryDto } from './dto/update-category.dto.ts';

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
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch('update/:id')
  update(
    @Body() updateCategoryDto: updateCategoryDto,
    @Param('id') id: string,
  ) {
    return this.categoryService.update(updateCategoryDto, id);
  }

  @Patch('delete/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
