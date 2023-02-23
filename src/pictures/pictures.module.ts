import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Pictures } from 'src/entities/Pictures';
import { UsersModule } from 'src/users/users.module';
import { multerOptionsFactory } from 'src/utills/multer.option';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

@Module({
  imports:[
    NestjsFormDataModule,
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory
    }),
    TypeOrmModule.forFeature([Pictures]),UsersModule],
  controllers: [PicturesController],
  providers: [PicturesService]
})
export class PicturesModule {}
