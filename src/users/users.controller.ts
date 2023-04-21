import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입 API
  @Post('/auth/signup')
  async createUser(
    @Body() data: CreateUserDto,
  ): Promise<object> {
    return await this.usersService.createUser(data);
  }

  // 로그인 API
  @Post('/auth/login')
  async login(@Body() data: CreateUserDto): Promise<object> {
    return await this.usersService.login(data);
  }
}
