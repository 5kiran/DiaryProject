import { IsString } from 'class-validator';

export class CreateCalendarDto {
  @IsString()
  title: string;

  @IsString()
  start: Date;

  @IsString()
  end: Date;
}
