import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data/dist/decorators';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  createPicture(@UploadedFile() file: Express.Multer.File,@Body() data) {
    return this.picturesService.createPicture(file.filename,data.date)
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllPictures(){
    return await this.picturesService.getAllPictures()
  }
}
