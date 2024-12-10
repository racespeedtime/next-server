import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('showName', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('selectNpc', ({ next }) => {
  return next()
})
