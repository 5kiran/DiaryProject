import { IsString } from 'class-validator';

export class GetCalendarDto {
  @IsString()
  start: Date;

  @IsString()
  end: Date;
}
