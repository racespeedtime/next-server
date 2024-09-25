import { createAllApi } from '@next-server/shared'
import instance from '@/utils/axios'

export const { menuApi, userApi, roleApi } = createAllApi(instance)
