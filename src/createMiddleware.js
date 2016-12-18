export default function createMiddleware(actionHandlers) {
  const result = store => next => action => {
    const handler = actionHandlers[action.type]
    if (!handler) return next(action)
    return handler(store)(next)(action)
  }
  result.actionHandlers = actionHandlers
  return result
}

