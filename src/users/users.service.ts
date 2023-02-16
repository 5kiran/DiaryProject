import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
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

  async findUser(name) {
    const findUser = await this.usersRepository.findOne({ where: { name } });
    return findUser
  }
  async createUser(name, password) {
    const find = this.findUser(name)
    if (find) {
      throw new ConflictException('너 누구니?');
    }
    this.usersRepository.insert({
      name,
      password,
    });
    return '가입 성공';
  }

  async login(data: CreateUserDto) {
    const find = this.findUser(data.name)
    if(!find) {
      throw new NotFoundException('존재하지 않는 name입니다.')
    }
    
  }
}
