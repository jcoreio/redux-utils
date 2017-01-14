import checkForNonFunctions from './checkForNonFunctions'

export default function createMiddleware(actionHandlers) {
  if (process.env.NODE_ENV !== 'production') checkForNonFunctions(actionHandlers, 'actionHandlers')

  const result = store => next => action => {
    const handler = actionHandlers[action.type]
    if (!handler) return next(action)
    return handler(store)(next)(action)
  }
  result.actionHandlers = actionHandlers
  return result
}

