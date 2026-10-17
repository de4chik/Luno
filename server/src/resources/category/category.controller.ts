import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}
