import { DeathMatch } from 'src/death-match/entities/death-match.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class DeathMatchWeapon {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '模型ID' })
  modelId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => DeathMatch, deathMatch => deathMatch.weapons)
  deathMatch: DeathMatch
}
