import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './dto/create-articledto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/articles')
  async getArticles() {
    return this.boardService.getArticles();
  }

  @Get('/articles/:id')
  async getArticlesById(@Param('id') id: number) {
    return this.boardService.getArticlesById(id);
  }

  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    this.boardService.createArticle(
      data.author,
      data.title,
      data.content,
      data.password,
    );
  }

  @Patch('/articles/:id')
  async updateArticle(@Param('id') id: number, @Body() data: UpdateArticleDto) {
    return this.boardService.updateArticle(
      id,
      data.author,
      data.title,
      data.content,
      data.password,
    );
  }

  @Delete('/articles/:id')
  async deleteArticle(@Param('id') id: number, @Body() data: DeleteArticleDto) {
    return this.boardService.deleteArticle(id, data.password);
  }
}
