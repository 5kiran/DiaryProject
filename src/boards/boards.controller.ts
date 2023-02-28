import { Controller, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create.board.dto';
import { getAllBoards } from './interface/get.all.board';
import { GetAllBoardsDto } from './dto/get.all.board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('all/:start/:end')
  @UseGuards(AuthGuard())
  async getAllBoards(@Param() data: GetAllBoardsDto): Promise<getAllBoards[]> {
    return await this.boardsService.getAllBoards(data);
  }

  @Post()
  @UseGuards(AuthGuard())
  createBoard(@Req() req, @Body() data: CreateBoardDto): void {
    const userName = req.user.name;
    this.boardsService.createBoard(userName, data);
  }

  @Get('detail/:id')
  @UseGuards(AuthGuard())
  async getOneBoard(@Param('id') id: number) {
    const article = await this.boardsService.getOneBoard(id);
    return article;
  }
}
