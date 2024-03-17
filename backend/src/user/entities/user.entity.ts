import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from 'src/role/entities/role.entity'
import { Exclude } from 'class-transformer'
import { AttireUser } from 'src/attire/user/entities/user.entity'
import { Board } from 'src/board/entities/board.entity'
import { Goods } from 'src/goods/entities/goods.entity'
import { Race } from 'src/race/entities/race.entity'
import { RaceRecord } from 'src/race/record/entities/record.entity'
import { Team } from 'src/team/entities/team.entity'
import { TeamUser } from 'src/team/user/entities/user.entity'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { Teleport } from 'src/teleport/entities/teleport.entity'
import { House } from 'src/house/entities/house.entity'
import { Question } from 'src/question/entities/question.entity'
import { UserSetting } from '../setting/entities/setting.entity'
import { UserLoginRecord } from '../login-record/entities/login-record.entity'
import { UserBan } from '../ban/entities/ban.entity'

@Entity({ name: 'sys_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '用户名' })
  username: string

  @Column({ comment: '新旧哈希' })
  @Exclude()
  password: string

  @Column({ nullable: true, comment: '旧版本盐' })
  @Exclude()
  salt: string

  @Column({ default: 0, comment: '时间积分' })
  score: number

  @Column({ default: 0, comment: '金币' })
  @Exclude()
  cash: number

  @Column({ default: 0, comment: '经验值' })
  exp: number

  @Column({ default: 0, comment: '等级' })
  @Exclude()
  level: number

  @Column({ unique: true, nullable: true, comment: '邮箱' })
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date

  @ManyToMany(() => Role, role => role.users)
  roles: Role[]

  @OneToOne(() => UserSetting)
  setting: UserSetting

  @OneToMany(() => AttireUser, attire => attire.user)
  attires: AttireUser

  @OneToMany(() => Board, board => board.user)
  boards: Board[]

  @OneToMany(() => Goods, good => good.user)
  goods: Goods[]

  @OneToMany(() => UserLoginRecord, record => record.user)
  loginRecords: UserLoginRecord[]

  @OneToMany(() => UserBan, ban => ban.user)
  bans: UserBan[]

  @OneToMany(() => Race, race => race.user)
  races: Race[]

  @OneToMany(() => RaceRecord, record => record.user)
  raceRecords: RaceRecord[]

  @OneToMany(() => Team, team => team.user)
  teams: Team[]

  @OneToMany(() => TeamUser, teamUser => teamUser.user)
  teamUsers: TeamUser[]

  @OneToMany(() => Vehicle, vehicle => vehicle.user)
  vehicles: Vehicle[]

  @OneToMany(() => Teleport, teleport => teleport.user)
  teleports: Teleport[]

  @ManyToMany(() => House, house => house.users)
  buyHouses: House[]

  @OneToMany(() => House, house => house.user)
  uploadHouses: House[]

  @OneToMany(() => Question, question => question.user)
  questions: Question[]
}
