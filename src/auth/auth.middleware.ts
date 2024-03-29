import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('JWT does not Found');
    }

    let token: string;
    try {
      token = authHeader.split('')[1];
      const payload = await this.jwtService.verify(token);
      req.user = payload;
    } catch (error) {
      throw new UnauthorizedException('JWT does not Found');
    }
  }
}
