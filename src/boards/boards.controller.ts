import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService : BoardsService){}
  
  @Get()
  @UseGuards(AuthGuard())
  async getAllBoards(){
    return this.boardsService.getAllBoards()
  }
}
