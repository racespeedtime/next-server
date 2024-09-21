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
import { RaceModule } from './race/race.module'
import { TeamModule } from './team/team.module'
import { GoodsModule } from './goods/goods.module'
import { VehicleModule } from './vehicle/vehicle.module'
import { UserSetting } from './user/setting/entities/setting.entity'
import { UserSettingModule } from './user/setting/setting.module'
import { AttireUser } from './attire/user/entities/user.entity'
import { AttireUserModule } from './attire/user/user.module'
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
import { VehicleAttachment } from './vehicle/attachment/entities/attachment.entity'
import { VehicleAttachmentModule } from './vehicle/attachment/attachment.module'
import { TeamUser } from './team/user/entities/user.entity'
import { TeamUserModule } from './team/user/user.module'
import { RaceCpScriptModule } from './race/cp/script/script.module'
import { RaceCpScript } from './race/cp/script/entities/script.entity'
import { TeleportModule } from './teleport/teleport.module'
import { Teleport } from './teleport/entities/teleport.entity'
import { HouseModule } from './house/house.module'
import { House } from './house/entities/house.entity'
import { HouseModel } from './house/model/entities/model.entity'
import { HouseModelModule } from './house/model/model.module'
import { QuestionModule } from './question/question.module'
import { Question } from './question/entities/question.entity'
import { DeathMatchModule } from './death-match/death-match.module'
import { DeathMatch } from './death-match/entities/death-match.entity'
import { DeathMatchSpawn } from './death-match/spawn/entities/spawn.entity'
import { DeathMatchSpawnModule } from './death-match/spawn/spawn.module'
import { DeathMatchWeaponModule } from './death-match/weapon/weapon.module'
import { DeathMatchWeapon } from './death-match/weapon/entities/weapon.entity'
import { TipModule } from './tip/tip.module'
import { Tip } from './tip/entities/tip.entity'
import { HostnameModule } from './hostname/hostname.module'
import { Hostname } from './hostname/entities/hostname.entity'
import { BoardModule } from './board/board.module'
import { BoardUserModule } from './board/user/user.module'
import { BoardUser } from './board/user/entities/user.entity'

const isDev = process.env.NODE_ENV === 'development'

const authModules = [RoleModule, RouterModule, AuthModule]
const authEntities = [Role, Router]

const userModules = [
  UserSettingModule,
  UserLoginRecordModule,
  UserBanModule,
  UserModule,
]
const userEntities = [
  User,
  UserSetting,
  UserLoginRecord,
  UserBan,
]

const attireModules = [AttireUserModule, AttireModule]
const attireEntities = [Attire, AttireUser]

const raceModules = [RaceCpScriptModule, RaceCpModule, RaceRecordModule, RaceModule]
const raceEntities = [Race, RaceCp, RaceCpScript, RaceRecord]

const vehicleModules = [VehicleAttachmentModule, VehicleModule]
const vehicleEntities = [Vehicle, VehicleAttachment]

const teamModules = [TeamUserModule, TeamModule]
const teamEntities = [Team, TeamUser]

const houseModules = [HouseModelModule, HouseModule]
const houseEntities = [House, HouseModel]

const deathMatchModules = [DeathMatchSpawnModule, DeathMatchWeaponModule, DeathMatchModule]
const deathMatchEntities = [DeathMatch, DeathMatchSpawn, DeathMatchWeapon]

const boardModules = [BoardUserModule, BoardModule]
const boardEntities = [Board, BoardUser]

const miscModules = [GoodsModule, TeleportModule, QuestionModule, TipModule, HostnameModule]
const miscEntities = [Goods, Teleport, Question, Tip, Hostname]

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
            ...houseEntities,
            ...deathMatchEntities,
            ...boardEntities,
            ...miscEntities,
          ],
          // timezone: '+08:00',
          timezone: '+00:00',
        }
      },
    }),
    ...userModules,
    ...authModules,
    ...vehicleModules,
    ...raceModules,
    ...attireModules,
    ...teamModules,
    ...houseModules,
    ...deathMatchModules,
    ...boardModules,
    ...miscModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
