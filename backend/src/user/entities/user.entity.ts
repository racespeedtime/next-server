import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from 'src/role/entities/role.entity'
import { Exclude } from 'class-transformer'

@Entity({ name: 'sys_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column({ unique: true })
  @Exclude()
  password: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ nullable: true })
  last_login: Date

  @ManyToMany(() => Role, role => role.users)
  roles: Role[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date
}
