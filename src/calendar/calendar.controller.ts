import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create.calendar.dto';
import { GetCalendarDto } from './dto/get.calendar.dto';

@Controller('api/calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  @UseGuards(AuthGuard())
  addSchedule(@Body() data: CreateCalendarDto) {
    this.calendarService.addSchedule(data);
  }

  @Get('/:start/:end')
  getSchedule(@Param() data: GetCalendarDto) {
    return this.calendarService.getSchedule(data);
  }
}
