import type { AxiosInstance } from 'axios'
import type { CustomAxiosRequest } from 'shared/types'
import { createMenuApi } from './system/menu'
import { createRoleApi } from './system/role'
import { createUserApi } from './system/user'
import { createRaceApi } from './race'
import { createVehicleApi } from './vehicle'

export function createAllApi(instance: AxiosInstance) {
  const request: CustomAxiosRequest = {
    get<T = any>(url: string, params?: object): Promise<T> {
      return instance.get(url, { params })
    },

    post<T = any>(url: string, data?: object): Promise<T> {
      return instance.post(url, data)
    },

    patch<T = any>(url: string, data?: object): Promise<T> {
      return instance.patch(url, data)
    },

    put<T = any>(url: string, data?: object): Promise<T> {
      return instance.put(url, data)
    },

    delete<T = any>(url: string): Promise<T> {
      return instance.delete(url)
    },

    upload<T = any>(url: string, params?: object): Promise<T> {
      return instance.post(url, params, {
        timeout: undefined,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  }

  return {
    menuApi: createMenuApi(request),
    roleApi: createRoleApi(request),
    userApi: createUserApi(request),
    raceApi: createRaceApi(request),
    vehicleApi: createVehicleApi(request),
  }
}
