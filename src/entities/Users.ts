import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boards } from './Boards';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({unique : true})
  name: string;

  @Column()
  password: string;

  @Column()
  sex: boolean;

  @OneToMany(() => Boards, (boards) => boards.user)
  boards : Boards
}
