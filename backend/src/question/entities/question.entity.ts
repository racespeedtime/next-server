import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, comment: '问题' })
  name: string

  @Column({ comment: '答案' })
  answer: string

  @Column({ default: true, comment: '是否启用' })
  isEnabled: boolean

  @ManyToOne(() => User, user => user.questions)
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
