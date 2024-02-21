import { PickType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-articledto';

export class DeleteArticleDto extends PickType(CreateArticleDto, [
  'password',
] as const) {}
