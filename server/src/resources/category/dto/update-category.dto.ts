import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto.ts';

export class updateCategoryDto extends PartialType(CreateCategoryDto) {}
