import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(data: CreateUserDto) {
    const find = await this.usersRepository.findOne({
      where: { name: data.name },
    });
    if (find) {
      throw new ConflictException('너 누구니?');
    }
    this.usersRepository.insert({
      name: data.name,
      password: data.password,
    });

    return '가입 성공';
  }
}
