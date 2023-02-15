import { BadRequestException } from '@nestjs/common/exceptions';
import { PipeTransform } from '@nestjs/common/interfaces';
import { CreateUserDto } from '../dto/create.user.dto';

export class UserNameValidationPipe implements PipeTransform {
  readonly nameOption = ['모찌', '만두'];
  transform(value: CreateUserDto) {
    const name = value.name;
    if (this.valueNameValid(name)) {
      throw new BadRequestException(`우리가 누구? xx,xx`);
    }
    return value;
  }

  private valueNameValid(name: string) {
    const index = this.nameOption.indexOf(name);
    return index === -1;
  }
}
