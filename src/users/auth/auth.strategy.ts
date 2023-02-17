import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interface/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: '5kiran',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersRepository.findOne({
      where: { name: payload.name },
      select: ['id', 'name'],
    });
    return user;
  }
}
