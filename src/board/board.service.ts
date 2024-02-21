import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) { }

  async getArticles() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['author', 'title', 'createdAt'],
    });
  }

  async getArticlesById(id: number) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
    });
  }

  createArticle(
    author: string,
    title: string,
    content: string,
    password: string,
  ) {
    this.articleRepository.insert({
      author,
      title,
      content,
      password,
    });
  }

  async updateArticle(
    id: number,
    author: string,
    title: string,
    content: string,
    password: string,
  ) {
    await this.checkPassword(id, password);
    this.articleRepository.update(id, { author, title, content });
  }

  async deleteArticle(id: number, password: string) {
    await this.checkPassword(id, password);
    this.articleRepository.softDelete(id);
  }

  private async checkPassword(id: number, password: string) {
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    if (!article) {
      throw new NotFoundException(`해당 ${id}를 가진 article은 없습니다.`);
    }

    if (article.password !== password) {
      throw new UnauthorizedException(
        `해당 ${id} article에 대한 접근권한이 없습니다.`,
      );
    }
  }
}
