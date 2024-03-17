import { Exclude } from 'class-transformer'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { VehicleAttachment } from '../attachment/entities/attachment.entity'

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '模型Id' })
  modelId: number

  @Column({ type: 'double', comment: 'x' })
  x: number

  @Column({ type: 'double', comment: 'y' })
  y: number

  @Column({ type: 'double', comment: 'z' })
  z: number

  @Column({ type: 'double', comment: '角度' })
  angle: number

  @Column({ default: 0, comment: '颜色1' })
  color1: number

  @Column({ default: 0, comment: '颜色2' })
  color2: number

  @Column({ default: 0, comment: '世界Id' })
  worldId: number

  @Column({ default: 0, comment: '内部空间Id' })
  interiorId: number

  @Column({ default: false, comment: '是否上锁' })
  isLocked: boolean

  @Column({ nullable: true, type: 'double', comment: '售价' })
  price: number

  @Column({ nullable: true, comment: '可能是喷漆' })
  paintjob: number

  @Column({ nullable: true, comment: '描述' })
  description: string

  @Column({ nullable: true, comment: '车牌' })
  plateNumber: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date

  @ManyToOne(() => User, user => user.vehicles)
  user: User

  @OneToMany(() => VehicleAttachment, attachment => attachment.vehicle)
  attachments: VehicleAttachment[]
}
