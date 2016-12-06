import mapValues from 'lodash.mapvalues'

export default function createMiddleware(actionHandlers) {
  const result = store => {
    const handlersForStore = mapValues(actionHandlers, handler => handler(store))
    return next => {
      const handlersForNext = mapValues(handlersForStore, handler => handler(next))
      return action => {
        const handler = handlersForNext[action.type]
        return handler ? handler(action) : next(action)
      }
    }
  }
  result.actionHandlers = actionHandlers
  return result
}
