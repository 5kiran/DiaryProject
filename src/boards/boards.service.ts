import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boards } from 'src/entities/Boards';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository : Repository<Boards>
  ){}

  async getAllBoards(){
    return await this.boardsRepository.find()
  }
}
