import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Calendar } from 'src/entities/calendar';
import { Pictures } from 'src/entities/Pictures';
import { Users } from 'src/entities/Users';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_DATABASE'),
      entities: [Users, Boards, Pictures, Calendar],
      synchronize: true,
      logging: false,
      timezone: 'local',
      charset: 'utf8mb4',
    };
  }
}
