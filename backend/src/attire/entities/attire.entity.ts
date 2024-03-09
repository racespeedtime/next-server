import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { UserAttire } from '../user/entities/user.entity'

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  @Exclude()
  deleteAt: Date

  @OneToMany(() => UserAttire, userAttire => userAttire.attire)
  users: UserAttire[]
}
