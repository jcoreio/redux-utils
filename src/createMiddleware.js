import checkForNonFunctions from './checkForNonFunctions'
import addCreationStack from './addCreationStack'

export default function createMiddleware(actionHandlers) {
  if (process.env.NODE_ENV !== 'production') checkForNonFunctions(actionHandlers, 'actionHandlers')

  let result = store => next => {
    let handleAction = action => {
      const handler = actionHandlers[action.type]
      if (!handler) return next(action)
      return handler(store)(next)(action)
    }
    if (process.env.NODE_ENV !== 'production') handleAction = addCreationStack(handleAction, 'middleware')
    return handleAction
  }
  result.actionHandlers = actionHandlers
  return result
}

