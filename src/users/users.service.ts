import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
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
    try {
      const user = await this.usersRepository.create({
        name: data.name,
        password: data.password,
      });

      await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
