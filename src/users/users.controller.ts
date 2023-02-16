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
import * as bcrypt from 'bcryptjs'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //회원가입 API
  @Post('/auth/signup')
  async createUser(
    @Body(UserNameValidationPipe) data: CreateUserDto,
  ): Promise<string> {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(data.password, salt)
    const create = await this.usersService.createUser(data.name, hashedPassword);
    return create;
  }
}
