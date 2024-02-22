import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    return await this.userService.login(data.userId, data.password);
  }

  @Post('/signup')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(
      data.userId,
      data.password,
      data.name,
    );
  }

  @Put('/update')
  updateUser(@Body() data: UpdateUserDto) {
    this.userService.updateUser(data.userId, data.password, data.name);
  }
}
