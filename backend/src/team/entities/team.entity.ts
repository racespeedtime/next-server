import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TeamUser } from '../user/entities/user.entity'

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '简称 ' })
  shortName: string

  @Column({ comment: '全称' })
  fullName: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  // 创建人
  @ManyToOne(() => User, user => user.teams)
  user: User

  // 团队成员
  @OneToMany(() => TeamUser, teamUser => teamUser.team)
  users: TeamUser[]
}
