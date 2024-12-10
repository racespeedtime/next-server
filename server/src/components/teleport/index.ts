import { PlayerEvent } from '@infernus/core'

PlayerEvent.onCommandText('telemenu', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['s', 'sp'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['l', 'lp'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('xiufu', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('vmake', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText('vsmake', ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['tp', 'tpa', 'goto'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['ta', 'yes'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['td', 'no'], ({ next }) => {
  return next()
})

PlayerEvent.onCommandText(['bring', 'get'], ({ next }) => {
  return next()
})
