import { House } from 'src/house/entities/house.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'

@Entity()
export class Teleport {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Unique(['name', 'isSystem'])
  name: string

  @Column({ type: 'double', comment: 'x' })
  x: number

  @Column({ type: 'double', comment: 'y' })
  y: number

  @Column({ type: 'double', comment: 'z' })
  z: number

  @Column({ type: 'double', comment: '角度' })
  angle: number

  @Column({ nullable: true, comment: '备注' })
  description: string

  @Column({ type: 'boolean', default: false, comment: '是否为系统级,即单斜杠传送' })
  isSystem: boolean

  @Column({ default: true, comment: '是否启用' })
  isEnabled: boolean

  @Column({ default: 0, comment: '内部空间Id' })
  interiorId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => User, user => user.teleports)
  user: User

  @OneToOne(() => House)
  @JoinColumn()
  house: House
}
