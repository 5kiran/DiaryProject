import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";

export const typeOrmConfig : TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'dog94',
  database: 'love_diary',
  entities: [Users],
  synchronize : true
}