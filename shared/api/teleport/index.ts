import type { CustomAxiosRequest } from 'shared/types'
import { getRestfulApi } from 'shared/utils'

export function createTeleportApi(request: CustomAxiosRequest) {
  return {
    ...getRestfulApi(request, 'teleport'),
  }
}
