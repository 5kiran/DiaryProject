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
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async findUser(email) {
    const findUser = await this.usersRepository.findOne({ where: { email } });
    return findUser;
  }

  async createUser(data: CreateUserDto) {
    const findUser = await this.findUser(data.email);
    if (findUser) {
      throw new ConflictException('이미 존재하는 email 입니다.');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await this.usersRepository.save({
      name: data.name,
      password: hashedPassword,
    });

    const accessToken = this.createAccessToken(user.id, user.email);
    return accessToken;
  }

  async login(data: LoginUserDto) {
    const findUser = await this.findUser(data.email);
    if (!findUser) {
      throw new NotFoundException('존재하지 않는 email입니다.');
    }
    if (!(await bcrypt.compare(data.password, findUser.password))) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const accessToken = this.createAccessToken(findUser.id, findUser.email);
    return accessToken;
  }

  async createAccessToken(id, email) {
    const payload: JwtPayload = { id, email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
