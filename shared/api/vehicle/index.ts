import type { CustomAxiosRequest } from 'shared/types'
import { getRestfulApi } from 'shared/utils'

export function createVehicleApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'vehicle'),
  }
}
