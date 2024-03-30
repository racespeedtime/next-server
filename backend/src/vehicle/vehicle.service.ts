import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits, getDateRangeOperator } from 'src/common/utils/condition-where.utils'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { GetVehicleDto } from './dto/get-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.save(createVehicleDto)
  }

  async findAll(payload: GetVehicleDto) {
    const findOptions: FindManyOptions<Vehicle> = {
      where: {
        ...conditionWhere<GetVehicleDto>({
          payload,
          equals: ['userId', 'modelId', 'isLocked', 'interiorId', 'worldId'],
          mapping: { userId: 'user.id' },
          omits: getConditionOmits<GetVehicleDto>(),
        }),
        deletedAt: null,
        createdAt: getDateRangeOperator({ payload }),
      },
      relations: { user: !payload.isAll },
      order: {
        createdAt: 'DESC',
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.vehicleRepository.findAndCount(findOptions)
    return { list, total }
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: {
        user: true,
      },
    })
    if (!vehicle)
      throw new Error('vehicle not found')
    return vehicle
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id)

    const merged = this.vehicleRepository.merge(
      vehicle,
      updateVehicleDto,
    )

    return this.vehicleRepository.save(merged)
  }

  async remove(id: string) {
    const vehicle = await this.findOne(id)
    return this.vehicleRepository.softRemove(vehicle)
  }
}
