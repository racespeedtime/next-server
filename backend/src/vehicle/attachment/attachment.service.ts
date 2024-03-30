import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { conditionWhere, getConditionOmits, getDateRangeOperator } from 'src/common/utils/condition-where.utils'
import { CreateVehicleAttachmentDto } from './dto/create-attachment.dto'
import { UpdateVehicleAttachmentDto } from './dto/update-attachment.dto'
import { GetVehicleAttachmentDto } from './dto/get-attchment.dto'
import { VehicleAttachment } from './entities/attachment.entity'

@Injectable()
export class VehicleAttachmentService {
  constructor(
    @InjectRepository(VehicleAttachment) private readonly vehicleAttachmentRepository: Repository<VehicleAttachment>,
  ) {}

  create(createVehicleAttachmentDto: CreateVehicleAttachmentDto) {
    return this.vehicleAttachmentRepository.save(createVehicleAttachmentDto)
  }

  async findAll(payload: GetVehicleAttachmentDto) {
    const findOptions: FindManyOptions<VehicleAttachment> = {
      where: {
        ...conditionWhere<GetVehicleAttachmentDto>({
          payload,
          equals: ['vehicleId'],
          mapping: { vehicleId: 'vehicle.id' },
          omits: getConditionOmits<GetVehicleAttachmentDto>(),
        }),
      },
      relations: {
        vehicle: !payload.isAll,
        attire: !payload.isAll,
      },
    }
    if (!payload.isAll) {
      findOptions.skip = payload.skip
      findOptions.take = payload.take
    }
    const [list, total] = await this.vehicleAttachmentRepository.findAndCount(findOptions)
    return { list, total }
  }

  async findOne(id: string) {
    const vehicleAttachment = await this.vehicleAttachmentRepository.findOne({
      where: { id },
      relations: {
        vehicle: true,
        attire: true,
      },
    })
    if (!vehicleAttachment)
      throw new Error('vehicleAttachment not found')
    return vehicleAttachment
  }

  async update(id: string, updateVehicleAttachmentDto: UpdateVehicleAttachmentDto) {
    const vehicleAttachment = await this.findOne(id)
    if (!vehicleAttachment)
      throw new Error('vehicleAttachment not found')

    const merged = this.vehicleAttachmentRepository.merge(
      vehicleAttachment,
      updateVehicleAttachmentDto,
    )

    return this.vehicleAttachmentRepository.save(merged)
  }

  async remove(id: string) {
    const vehicleAttachment = await this.findOne(id)
    if (!vehicleAttachment)
      throw new Error('vehicleAttachment not found')

    return this.vehicleAttachmentRepository.remove(vehicleAttachment)
  }

  countSameAttires(vehicleId: string, attireId: string) {
    return this.vehicleAttachmentRepository.count({
      where: {
        vehicle: {
          id: vehicleId,
        },
        attire: {
          id: attireId,
        },
      },
    })
  }
}
