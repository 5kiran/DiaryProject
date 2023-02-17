import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { UsersModule } from 'src/users/users.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports:[TypeOrmModule.forFeature([Boards]),UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
