import { Race } from 'src/race/entities/race.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RaceCPScript } from '../script/entities/script.entity'

@Entity({})
export class RaceCp {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ comment: '第几个检查点' })
  checkpoint: number

  @Column({ type: 'double', comment: 'x' })
  x: number

  @Column({ type: 'double', comment: 'y' })
  y: number

  @Column({ type: 'double', comment: 'z' })
  z: number

  @Column({ type: 'double', comment: '角度' })
  angle: number

  @Column({ type: 'double', comment: '大小' })
  size: number

  @ManyToOne(() => Race, race => race.checkpoints)
  race: Race

  @ManyToOne(() => RaceCPScript, scripts => scripts.checkpoint)
  scripts: RaceCPScript[]
}
