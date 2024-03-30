import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { AttireType } from 'src/common/enums/attire.enum'
import { VehicleAttachment } from 'src/vehicle/attachment/entities/attachment.entity'
import { AttireUser } from '../user/entities/user.entity'

@Entity()
export class Attire {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '装扮名' })
  name: string

  @Column({ comment: '模型ID' })
  modelId: number

  @Column({ default: 0, comment: '骨骼ID' })
  boneId: number

  @Column({ default: 0, comment: '价格' })
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

  @Column({ type: 'double', default: 1.0, comment: 'sX' })
  sX: number

  @Column({ type: 'double', default: 1.0, comment: 'sY' })
  sY: number

  @Column({ type: 'double', default: 1.0, comment: 'sZ' })
  sZ: number

  @Column({ type: 'enum', enum: AttireType, comment: '装扮类型' })
  type: AttireType

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date

  @OneToMany(() => AttireUser, userAttire => userAttire.attire)
  users: AttireUser[]

  @OneToMany(() => VehicleAttachment, vehicleAttachment => vehicleAttachment.attire)
  vehicles: VehicleAttachment[]
}
