import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create.board.dto';
import { getAllBoards } from './interface/get.all.board';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
  ) {}

  async getAllBoards() {
    const boards = await this.boardsRepository.find({
      select: ['id', 'title', 'createdAt', 'writeName'],
    });
    const timeSetBoards : getAllBoards[] = await boards.map((element) => ({
      id: element.id,
      title: element.title,
      createAt: element.createdAt.toLocaleString(),
      writeName: element.writeName,
    }));
    return timeSetBoards
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
