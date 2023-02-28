import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from 'src/entities/calendar';
import { Between, Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create.calendar.dto';
import { GetCalendarDto } from './dto/get.calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
  ) {}

  addSchedule(data: CreateCalendarDto) {
    this.calendarRepository.insert({
      title: data.title,
      start: data.start,
      end: data.end,
    });
  }

  async getSchedule(data) {
    const start = data.start.split(':', 1);
    const end = data.end.split(':', 1);
    return this.calendarRepository.find({where : {
      start : Between(start,end),
      end : Between(start,end)
    }})
  }
}
