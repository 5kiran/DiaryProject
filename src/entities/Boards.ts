import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Boards {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  title: string

  @Column()
  content: string

  @CreateDateColumn()
  createdAt : Date
  
  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date|null
}