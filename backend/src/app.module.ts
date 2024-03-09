import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { User } from './user/entities/user.entity'
import { RoleModule } from './role/role.module'
import { Role } from './role/entities/role.entity'
import { UserModule } from './user/user.module'
import { Router } from './auth/router/entities/router.entity'
import { AttireModule } from './attire/attire.module'
import { BoardModule } from './board/board.module'
import { RaceModule } from './race/race.module'
import { TeamModule } from './team/team.module'
import { GoodsModule } from './goods/goods.module'
import { VehicleModule } from './vehicle/vehicle.module'
import { UserSetting } from './user/setting/entities/setting.entity'
import { UserSettingModule } from './user/setting/setting.module'
import { UserAttire } from './attire/user/entities/user.entity'
import { UserAttireModule } from './attire/user/user.module'
import { Attire } from './attire/entities/attire.entity'
import { Board } from './board/entities/board.entity'
import { Goods } from './goods/entities/goods.entity'
import { UserLoginRecord } from './user/login-record/entities/login-record.entity'
import { UserLoginRecordModule } from './user/login-record/login-record.module'
import { UserBan } from './user/ban/entities/ban.entity'
import { UserBanModule } from './user/ban/ban.module'
import { Race } from './race/entities/race.entity'
import { RaceCpModule } from './race/cp/cp.module'
import { RaceCp } from './race/cp/entities/cp.entity'
import { RouterModule } from './auth/router/router.module'
import { RaceRecordModule } from './race/record/record.module'
import { RaceRecord } from './race/record/entities/record.entity'
import { Vehicle } from './vehicle/entities/vehicle.entity'
import { Team } from './team/entities/team.entity'
import { VehicleAttachment } from './vehicle/attachments/entities/attachment.entity'
import { VehicleAttachmentsModule } from './vehicle/attachments/attachments.module'
import { TeamUser } from './team/user/entities/user.entity'
import { TeamUserModule } from './team/user/user.module'
import { RaceCpScriptModule } from './race/cp/script/script.module'
import { RaceCPScript } from './race/cp/script/entities/script.entity'

const isDev = process.env.NODE_ENV === 'development'

const authModules = [AuthModule, RoleModule, RouterModule]

const authEntities = [Role, Router]

const userModules = [
  UserModule,
  UserSettingModule,
  UserLoginRecordModule,
  UserBanModule,
]

const userEntities = [
  User,
  UserSetting,
  UserLoginRecord,
  UserBan,
]

const attireEntities = [Attire, UserAttire]

const attireModules = [AttireModule, UserAttireModule]

const raceModules = [RaceModule, RaceCpModule, RaceCpScriptModule, RaceRecordModule]

const raceEntities = [Race, RaceCp, RaceCPScript, RaceRecord]

const vehicleModules = [VehicleModule, VehicleAttachmentsModule]

const vehicleEntities = [Vehicle, VehicleAttachment]

const teamModules = [TeamModule, TeamUserModule]

const teamEntities = [Team, TeamUser]

const miscModules = [BoardModule, GoodsModule]

const miscEntities = [Board, Goods]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          synchronize: isDev,
          logging: isDev,
          entities: [
            ...userEntities,
            ...authEntities,
            ...vehicleEntities,
            ...raceEntities,
            ...attireEntities,
            ...teamEntities,
            ...miscEntities,
          ],
          timezone: '+08:00',
        }
      },
    }),
    ...userModules,
    ...authModules,
    ...vehicleModules,
    ...raceModules,
    ...attireModules,
    ...teamModules,
    ...miscModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
