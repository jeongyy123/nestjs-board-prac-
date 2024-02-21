import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-articledto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
