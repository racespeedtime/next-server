import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { DeathMatch } from 'src/death-match/entities/death-match.entity'
import { Race } from 'src/race/entities/race.entity'
import { HouseRelation } from 'src/common/enums/house.enum'
import { HouseModel } from '../model/entities/model.entity'

@Entity()
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, comment: '房屋名' })
  name: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @Column({ default: true, comment: '是否启用' })
  isEnabled: boolean

  @Column({ type: 'enum', enum: HouseRelation, default: HouseRelation.NONE, comment: '房屋关系' })
  relation: HouseRelation

  @ManyToOne(() => User, user => user.uploadHouses)
  user: User

  @ManyToMany(() => User, user => user.buyHouses)
  @JoinTable({ name: 'sys_user_house' })
  users: User[]

  @OneToMany(() => HouseModel, houseModel => houseModel.house)
  models: HouseModel[]

  @OneToOne(() => DeathMatch)
  deathMatch: DeathMatch

  @OneToOne(() => Race)
  race: Race

  price: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
