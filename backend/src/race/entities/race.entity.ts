import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RaceCp } from '../cp/entities/cp.entity'
import { RaceRecord } from '../record/entities/record.entity'
import { RaceCpScript } from '../cp/script/entities/script.entity'

@Entity()
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '赛道名' })
  name: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @Column({ default: true, comment: '是否启用' })
  isEnabled: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => User, user => user.races)
  user: User

  @OneToMany(() => RaceCp, cp => cp.race)
  checkpoints: RaceCp[]

  @OneToMany(() => RaceCpScript, script => script.race)
  scripts: RaceCpScript[]

  @OneToMany(() => RaceRecord, record => record.race)
  records: RaceRecord[]
}
