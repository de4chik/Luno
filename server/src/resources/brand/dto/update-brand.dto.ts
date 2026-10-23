import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto.ts';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
