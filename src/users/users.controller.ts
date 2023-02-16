import {
  Body,
  Controller,
  InternalServerErrorException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create.user.dto';
import { UserNameValidationPipe } from './pipes/user.name.validation.pipe';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //회원가입 API
  @Post('/auth/signup')
  async createUser(
    @Body(UserNameValidationPipe) data: CreateUserDto,
  ): Promise<string> {
    const create = await this.usersService.createUser(data);
    return create;
  }

  @Post('/auth/login')
  async login(@Body() data: CreateUserDto): Promise<object> {
    const login = await this.usersService.login(data);
    return login
  }
}
