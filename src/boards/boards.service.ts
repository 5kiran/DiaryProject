import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Between, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create.board.dto';
import { getAllBoards } from './interface/get.all.board';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
  ) {}

  async getAllBoards(data): Promise<getAllBoards[]> {
    const start = data.start.split(':', 1);
    const end = data.end.split(':', 1);
    const boards = await this.boardsRepository.find({
      where: {
        createdAt: Between(start, end),
      },
      select: ['id', 'title', 'createdAt'],
    });
    if (!boards) {
      throw new NotFoundException();
    }
    return boards;
  }

  createBoard(userId, data: CreateBoardDto) {
    if (!data.createdAt) {
      this.boardsRepository.insert({
        title: data.title,
        content: data.content,
        image: data.image,
        user: userId,
      });
      return;
    }
    this.boardsRepository.insert({
      title: data.title,
      content: data.content,
      image: data.image,
      user: userId,
      createdAt: data.createdAt,
    });
  }

  async getOneBoard(id) {
    const article = await this.boardsRepository.findOneBy({ id });
    return article;
  }
}