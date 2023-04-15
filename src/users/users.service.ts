import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './interface/jwt.payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService : JwtService
  ) {}

  async findUser(name) {
    const findUser = await this.usersRepository.findOne({ where: { name } });
    return findUser;
  }
  async createUser(data: CreateUserDto): Promise<string> {
    const findUser = await this.findUser(data.name);
    // if (findUser) {
    //   throw new ConflictException('너 누구니?');
    // }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    this.usersRepository.insert({
      name: data.name,
      password: hashedPassword,
    });
    return '가입 성공';
  }

  async login(data: CreateUserDto) {
    const findUser = await this.findUser(data.name);
    if (!findUser) {
      throw new NotFoundException('존재하지 않는 name입니다.');
    }
    if (!(await bcrypt.compare(data.password, findUser.password))) {
      throw new UnauthorizedException('Login Failed');
    }
    const payload : JwtPayload = { name : data.name }
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken };
  }
}
