import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'sys_user_setting' })
export class UserSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @Column({ default: 0, comment: '皮肤' })
  skinId: number

  @Column({ default: 12, comment: '分' })
  timeMinute: number

  @Column({ default: 0, comment: '时' })
  timeHour: number

  @Column({ default: 0, comment: '天气' })
  weather: number

  @Column({ nullable: true, comment: '称号前缀' })
  prefix: string

  @Column({ nullable: true, comment: '小尾巴后缀' })
  suffix: string

  @Column({ default: false, comment: '无敌模式' })
  Invincible: boolean

  @Column({ default: true, comment: '车辆自动翻转' })
  vehicleFlip: boolean

  @Column({ default: true, comment: '车辆自动修复' })
  vehicleAutoFix: boolean

  @Column({ default: true, comment: '车辆无碰撞' })
  vehicleNoCollision: boolean

  @Column({ default: true, comment: '显示物体' })
  showObject: boolean

  @Column({ default: true, comment: '显示速度表' })
  showSpeed: boolean

  @Column({ default: true, comment: '显示网络状况' })
  showNetstat: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
