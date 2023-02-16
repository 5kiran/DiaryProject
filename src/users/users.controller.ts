import {
  Body,
  Controller,
  InternalServerErrorException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create.user.dto';
import { UserNameValidationPipe } from './pipes/user.name.validation.pipe';
import { UsersService } from './users.service';

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
}
