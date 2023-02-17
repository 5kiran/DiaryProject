import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create.board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
  ) {}

  async getAllBoards() {
    return await this.boardsRepository.find();
  }

  createBoard(userName, data: CreateBoardDto) {
    this.boardsRepository.insert({
      title: data.title,
      content: data.content,
      image: data.image,
      writeName: userName,
    });
  }
}
