import { IsString } from 'class-validator';

export class GetAllBoardsDto {
  @IsString()
  start: Date;

  @IsString()
  end: Date;
}
