import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BrandService } from './brand.service.js';
import { CreateBrandDto } from './dto/create-brand.dto.ts';
import { UpdateBrandDto } from './dto/update-brand.dto.ts';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('all')
  getAll() {
    return this.brandService.findAll();
  }

  @Get('by-id/:id')
  getById(@Param('id') id: string) {
    return this.brandService.findById(id);
  }

  @Get('by-name/:name')
  getByName(@Param('name') name: string) {
    return this.brandService.findByName(name);
  }

  @Post('create')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Patch('update/:id')
  update(@Body() updateBrandDto: UpdateBrandDto, @Param('id') id: string) {
    return this.brandService.update(updateBrandDto, id);
  }

  @Patch('delete/:id')
  delete(@Body() updateBrandDto: UpdateBrandDto, @Param('id') id: string) {
    return this.brandService.update(updateBrandDto, id);
  }
}
