import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /* 로그인 */
  async login(userId: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { userId, deletedAt: null },
      select: ['id', 'password'],
    });

    if (!user) {
      throw new NotFoundException(`${userId}를 가진 유저가 없어요.`);
    }
    if (user.password !== password) {
      throw new UnauthorizedException(
        `${userId}계정의 비밀번호가 일치하지 않아요.`,
      );
    }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
  /* 회원가입 */
  async createUser(userId: string, password: string, name: string) {
    const existUser = await this.getUserInfo(userId);

    if (existUser) {
      throw new ConflictException(`${userId} 계정이 이미 존재합니다.`);
    }

    const insertResult = await this.userRepository.insert({
      userId,
      password,
      name,
    });

    const payload = { id: insertResult.identifiers[0].id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async getUserInfo(userId: string) {
    return await this.userRepository.findOne({
      where: { userId, deletedAt: null },
      select: ['name'],
    });
  }

  // async updateUser(userId: string, password: string, name: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { userId, deletedAt: null },
  //     select: ['password'],
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`해당 user`);
  //   }

  //   if (user.password !== password) {
  //     throw new UnauthorizedException(
  //       `${userId}계정의 비밀번호가 일치하지 않아요.`,
  //     );
  //   }

  //   await this.userRepository.update(userId, { password, name });
  // }
}
