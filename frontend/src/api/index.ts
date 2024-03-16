import { createAllApi } from 'shared/api'
import instance from '@/utils/axios'

const { menuApi, userApi, roleApi, raceApi, vehicleApi } = createAllApi(instance)

export { menuApi, userApi, roleApi, raceApi, vehicleApi }
