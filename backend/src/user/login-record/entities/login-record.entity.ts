import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'sys_user_login_record' })
export class UserLoginRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.loginRecords)
  user: User

  @Column({ nullable: true, comment: 'ip' })
  ip: string

  @Column({ nullable: true, comment: '城市' })
  city: string

  @CreateDateColumn({ nullable: true })
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
