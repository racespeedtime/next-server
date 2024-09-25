import type { CustomAxiosRequest } from '../../types'
import { getRestfulApi } from '../../utils'

export function createTeleportApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'teleport'),
  }
}
