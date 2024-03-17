import { House } from 'src/house/entities/house.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { DeathMatchSpawn } from '../spawn/entities/spawn.entity'

@Entity()
export class DeathMatch {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '死斗名' })
  name: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @Column({ default: true, comment: '是否启用' })
  isEnabled: boolean

  @Column({ default: 0, comment: '内部空间Id' })
  interiorId: number

  @OneToOne(() => House)
  @JoinColumn()
  house: House

  @OneToMany(() => DeathMatchSpawn, spawn => spawn.deathMatch)
  spawns: DeathMatchSpawn[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
