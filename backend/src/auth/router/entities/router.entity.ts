import { RouterType } from 'src/common/enums/router.enum'
import { Role } from 'src/role/entities/role.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'sys_router' })
export class Router {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  path: string

  @Column({ nullable: true })
  component: string

  @Column({ nullable: true })
  redirect: string

  @Column({ default: 0 })
  sort: number

  @Column({ type: 'enum', enum: RouterType, comment: '路由类型' })
  type: RouterType

  @Column({ nullable: true })
  button: string

  @Column({ nullable: true })
  icon: string

  @Column({ default: false })
  localIcon: boolean

  @Column({ nullable: true })
  description: string

  @Column({ default: true })
  show: boolean

  @Column({ default: false })
  keepAlive: boolean

  @Column({ default: false })
  affixTag: boolean

  @Column({ default: false })
  alwaysShow: boolean

  @Column({ default: true })
  breadCrumb: boolean

  @Column({ nullable: true })
  link: string

  @ManyToMany(() => Role, role => role.routes)
  @JoinTable({ name: 'sys_router_role' })
  roles: Role[]

  @Column({ nullable: true })
  parentId: string
}
