import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('yssy', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['camera', 'ssj', 'jt', 'cam'], ({ next }) => {
  return next()
})
