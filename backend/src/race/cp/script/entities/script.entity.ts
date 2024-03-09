import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Race } from 'src/race/entities/race.entity'
import { RaceCp } from '../../entities/cp.entity'

@Entity()
export class RaceCPScript {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true, comment: '脚本' })
  script: string

  @ManyToOne(() => Race, race => race.scripts)
  race: Race

  @ManyToOne(() => RaceCp, cp => cp.scripts)
  checkpoint: RaceCp
}
