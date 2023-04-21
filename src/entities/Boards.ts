import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./Users";

@Entity()
export class Boards {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  title: string

  @Column()
  content: string

  @Column({default:null})
  image: string | null

  @CreateDateColumn()
  createdAt : Date
  
  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date|null

  @ManyToOne(() => User, (user) => user.boards)
  user : User
}