import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'sys_user_goods' })
export class Goods {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '家具名称' })
  name: string

  @Column({ comment: '模型Id' })
  modelId: number

  @Column({ comment: '是否出售' })
  isSale: boolean

  @Column({ type: 'double', comment: '价格' })
  price: number

  @Column({ type: 'double', comment: 'x' })
  x: number

  @Column({ type: 'double', comment: 'y' })
  y: number

  @Column({ type: 'double', comment: 'z' })
  z: number

  @Column({ type: 'double', comment: 'rX' })
  rX: number

  @Column({ type: 'double', comment: 'rY' })
  rY: number

  @Column({ type: 'double', comment: 'rZ' })
  rZ: number

  @Column({ default: 0, comment: '世界Id' })
  worldId: number

  @Column({ default: 0, comment: '内部空间Id' })
  interiorId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, user => user.goods)
  user: User
}
