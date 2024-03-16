import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class VehicleAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '模型ID' })
  modelId: number

  @Column({ default: 0, comment: '插槽ID' })
  slotId: number

  @Column({ type: 'double', comment: 'x' })
  x: number

  @Column({ type: 'double', comment: 'y' })
  y: number

  @Column({ type: 'double', comment: 'z' })
  z: number

  @Column({ type: 'double', comment: 'rX' })
  rX: number

  @Column({ type: 'double', comment: 'rY' })
  rY: number

  @Column({ type: 'double', comment: 'rZ' })
  rZ: number

  @ManyToOne(() => Vehicle, vehicle => vehicle.attachments)
  vehicle: Vehicle
}
