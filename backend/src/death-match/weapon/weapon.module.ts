import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DeathMatchWeaponService } from './weapon.service'
import { DeathMatchWeaponController } from './weapon.controller'
import { DeathMatchWeapon } from './entities/weapon.entity'

@Module({
  controllers: [DeathMatchWeaponController],
  providers: [DeathMatchWeaponService],
  imports: [TypeOrmModule.forFeature([DeathMatchWeapon])],
})
export class DeathMatchWeaponModule {}
