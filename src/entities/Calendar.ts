import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  title : string

  @Column()
  start : Date
  
  @Column()
  end : Date

  @DeleteDateColumn()
  deletedAt: Date|null
}