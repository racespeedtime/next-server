import { DeathMatch } from 'src/death-match/entities/death-match.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class DeathMatchSpawn {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'double', comment: 'x' })
  x: number

  @Column({ type: 'double', comment: 'y' })
  y: number

  @Column({ type: 'double', comment: 'z' })
  z: number

  @Column({ type: 'double', comment: '角度' })
  angle: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => DeathMatch, deathMatch => deathMatch.spawns)
  deathMatch: DeathMatch
}
