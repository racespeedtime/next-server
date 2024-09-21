import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BoardUser } from '../user/entities/user.entity'

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '公告牌名称' })
  name: string

  @Column({ comment: '模型ID' })
  modelId: number

  @Column({ default: 0, comment: '价格' })
  price: number

  @Column({ nullable: true, comment: '公告板内容' })
  text: string

  @Column({ default: 0, comment: '纹理下标' })
  materialIndex: number

  @Column({ default: 90, comment: '纹理大小' })
  materialSize: number

  @Column({ default: 'Arial', comment: '字体名称' })
  fontFace: string

  @Column({ default: 28, comment: '字体大小' })
  fontSize: number

  @Column({ default: false, comment: '是否加粗' })
  bold: boolean

  @Column({ default: '-1', comment: '字体颜色' })
  color: string

  @Column({ default: '16777216', comment: '背景色' })
  bgColor: string

  @Column({ default: 1, comment: '对齐方式' })
  align: number

  @Column({ default: 0, type: 'double', comment: 'x' })
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

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date

  @OneToMany(() => BoardUser, userBoard => userBoard.board)
  users: BoardUser[]
}
