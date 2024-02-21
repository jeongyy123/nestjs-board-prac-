import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNumber()
  id: number;

  @IsString()
  author: string;

  @IsNumber()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  password: string;
}
