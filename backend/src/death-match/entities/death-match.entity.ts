import { House } from 'src/house/entities/house.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'

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

  @OneToOne(() => House)
  @JoinColumn()
  house: House

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
