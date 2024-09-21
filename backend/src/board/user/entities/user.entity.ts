import { Board } from 'src/board/entities/board.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'sys_user_board' })
export class BoardUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '价格' })
  price: number

  @Column({ comment: '公告板内容' })
  text: string

  @Column({ comment: '纹理下标' })
  materialIndex: number

  @Column({ comment: '纹理大小' })
  materialSize: number

  @Column({ comment: '字体名称' })
  fontFace: string

  @Column({ comment: '字体大小' })
  fontSize: number

  @Column({ comment: '是否加粗' })
  bold: boolean

  @Column({ comment: '字体颜色' })
  color: string

  @Column({ comment: '背景色' })
  bgColor: string

  @Column({ comment: '对齐方式' })
  align: number

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

  @Column({ comment: '世界Id' })
  worldId: number

  @Column({ comment: '内部空间Id' })
  interiorId: number

  @ManyToOne(() => User, user => user.boards)
  user: User

  @ManyToOne(() => Board, board => board.users)
  board: Board

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
