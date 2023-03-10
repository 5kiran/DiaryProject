import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Pictures {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  fileName: string

  @CreateDateColumn()
  createdAt : Date
  
  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date|null
}