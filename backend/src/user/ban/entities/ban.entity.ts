import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'sys_user_ban' })
export class UserBan {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ nullable: true, comment: '封号时间' })
  createdAt: Date

  @Column({ comment: '截止日期' })
  endAt: Date

  @Column({ comment: '截号原因' })
  reason: string

  @ManyToOne(() => User, user => user.bans)
  user: User
}
