import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from 'src/entities/calendar';
import { UsersModule } from 'src/users/users.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports : [TypeOrmModule.forFeature([Calendar]),UsersModule],
  controllers: [CalendarController],
  providers: [CalendarService]
})
export class CalendarModule {}
