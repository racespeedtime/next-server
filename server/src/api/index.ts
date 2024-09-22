import { createAllApi } from 'shared/api'
import instance from '@/utils/axios'

export const { menuApi, userApi, roleApi } = createAllApi(instance)
