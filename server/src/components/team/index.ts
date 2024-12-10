import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('t', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('wdtd', ({ next }) => {
  return next()
})
