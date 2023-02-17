import { Controller, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create.board.dto';
import { Boards } from 'src/entities/Boards';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllBoards(): Promise<Boards[]> {
    return await this.boardsService.getAllBoards();
  }

  @Post()
  @UseGuards(AuthGuard())
  createBoard(@Req() req, @Body() data: CreateBoardDto): void {
    const userName = req.user.name;
    this.boardsService.createBoard(userName, data);
  }
}
