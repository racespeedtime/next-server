import { createAllApi } from '@next-server/shared'
import instance from '@/utils/axios'

export const {
  menuApi,
  userApi,
  roleApi,
  raceApi,
  vehicleApi,
  houseApi,
  teleportApi,
  attireApi,
} = createAllApi(instance)
