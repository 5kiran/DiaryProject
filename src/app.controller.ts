import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  index() {
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const date = year + '.' + month + '.' + day;
    return { date: date };
  }

  @Get('calendar')
  @Render('calendar')
  calendar() {}
z
  @Get('diary')
  @Render('diary')
  diary() {
  }

  @Get('login')
  @Render('login')
  main() {}

  @Get('writeDiary')
  @Render('writediary')
  write() {}

  @Get('addPicture')
  @Render('addPicture')
  addPicture() {}

  @Get('checkToken')
  @UseGuards(AuthGuard())
  checkToken() {
    return {message : 'hi'}
  }
}
