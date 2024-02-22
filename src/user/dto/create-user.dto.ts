import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
