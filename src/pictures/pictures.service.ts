import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pictures } from 'src/entities/Pictures';
import { Repository } from 'typeorm';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Pictures)
    private readonly picturesRepositoty: Repository<Pictures>,
  ) {}

  createPicture(fileName, createdAt) {
    this.picturesRepositoty.insert({ fileName, createdAt });
  }

  getAllPictures() {
    return this.picturesRepositoty.find({order:{createdAt:'DESC'}})
  }
}
