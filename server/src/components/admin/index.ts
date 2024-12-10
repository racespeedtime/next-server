import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText(['aHelp', 'adminHelp', 'aCmds'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('giveCash', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('kick', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('reset', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('gmx', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('jail', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('giveAdmin', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('unAdmin', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('ban', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('unBan', ({ next }) => {
  return next()
})
