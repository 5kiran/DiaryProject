import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('calendar')
  @Render('calendar')
  calendar(){

  }

  @Get('diary')
  @Render('diary')
  diary(){
  }
}