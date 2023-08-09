//@ts-nocheck
import checkForNonFunctions from './checkForNonFunctions'
import addCreationStack from './addCreationStack'
export default function createMiddleware(actionHandlers: any) {
  if (process.env.NODE_ENV !== 'production')
    checkForNonFunctions(actionHandlers, 'actionHandlers')

  const result = (store: any) => (next: any) => {
    let handleAction = (action: any) => {
      const handler = actionHandlers[action.type]
      if (!handler) return next(action)
      return handler(store)(next)(action)
    }

    if (process.env.NODE_ENV !== 'production')
      handleAction = addCreationStack(handleAction, 'middleware')
    return handleAction
  }

  result.actionHandlers = actionHandlers
  return result
}
