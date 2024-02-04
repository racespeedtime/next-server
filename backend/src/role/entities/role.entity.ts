import { Router } from 'src/auth/router/entities/router.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'sys_role' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  code: string

  @Column({})
  name: string

  @Column({ default: 0 })
  sort: number

  @Column({ default: true })
  isEnabled: boolean

  @Column()
  remark: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => User, user => user.roles)
  @JoinTable({ name: 'sys_user_role' })
  users: User[]

  @ManyToMany(() => Router, router => router.roles)
  routes: Router[]
}
