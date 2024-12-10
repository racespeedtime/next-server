import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('ppc', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('dm', ({ next }) => {
  return next()
})
