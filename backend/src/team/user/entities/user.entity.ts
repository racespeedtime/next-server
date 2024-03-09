import { Team } from 'src/team/entities/team.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class TeamUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '是否为管理员' })
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Team, team => team.users)
  team: Team

  @ManyToOne(() => User, user => user.teamUsers)
  user: User
}
