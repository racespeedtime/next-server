import { Race } from 'src/race/entities/race.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class RaceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '完成总计毫秒' })
  record: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => User, user => user.raceRecords)
  user: User

  @ManyToOne(() => Race, race => race.records)
  race: Race
}
