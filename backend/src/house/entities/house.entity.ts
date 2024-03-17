import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, comment: '文件路径' })
  filePath: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @ManyToOne(() => User, user => user.uploadHouses)
  user: User

  @ManyToMany(() => User, user => user.buyHouses)
  @JoinTable({ name: 'sys_user_house' })
  users: User[]
}
