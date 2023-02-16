import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy} from "passport-jwt";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(Users)
    private usersRepository : Repository<Users>
    ){
      super({})
    }
}