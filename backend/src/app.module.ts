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

const isDev = process.env.NODE_ENV === 'development'

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
          entities: [User, Role, Router],
          timezone: '+08:00',
        }
      },
    }),
    AuthModule,
    UserModule,
    RoleModule,
    AttireModule,
    BoardModule,
    RaceModule,
    TeamModule,
    GoodsModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
