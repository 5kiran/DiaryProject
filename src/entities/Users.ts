import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Users {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name : string

  @Column()
  password : string

}