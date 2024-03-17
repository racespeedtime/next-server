import { House } from 'src/house/entities/house.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class HouseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '自定义类型' })
  type: string

  @Column({ comment: '类型对应参数' })
  args: string

  @ManyToOne(() => House, house => house.models)
  house: House

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
