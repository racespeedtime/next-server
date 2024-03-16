import { Attire } from 'src/attire/entities/attire.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'sys_user_attire' })
export class AttireUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 0, comment: '骨骼ID' })
  boneId: number

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

  @ManyToOne(() => Attire, attire => attire.users)
  attire: Attire

  @ManyToOne(() => User, user => user.attires)
  user: User
}
