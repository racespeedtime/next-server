import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
    const [list, total] = await this.vehicleRepository.findAndCount({
      skip: payload.skip,
      take: payload.take,
    })
    return { list, total }
  }

  findOne(id: string) {
    return this.vehicleRepository.findOne({ where: { id } })
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id)
    if (!vehicle)
      throw new Error('vehicle not found')

    const merged = this.vehicleRepository.merge(
      vehicle,
      updateVehicleDto,
    )

    return this.vehicleRepository.save(merged)
  }

  async remove(id: string) {
    const vehicle = await this.findOne(id)
    if (!vehicle)
      throw new Error('vehicle not found')

    return this.vehicleRepository.remove(vehicle)
  }
}
