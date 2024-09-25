import type { CustomAxiosRequest } from '../../types'
import { getRestfulApi } from '../../utils'

export function createVehicleApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'vehicle'),
  }
}
