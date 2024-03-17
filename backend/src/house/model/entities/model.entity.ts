import { House } from 'src/house/entities/house.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class HouseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  type: string

  @Column()
  args: string

  @ManyToOne(() => House, house => house.models)
  house: House

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
