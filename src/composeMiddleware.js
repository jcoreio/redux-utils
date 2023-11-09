import { size, forEach, mapValues } from 'lodash'
import createMiddleware from './createMiddleware'
import checkForNonFunctions from './checkForNonFunctions'
import addCreationStack from './addCreationStack'

/**
 * @param middlewares an array of one or more middlewares.
 * @returns a middleware that calls all of the given middlewares in sequence.
 */
function naiveComposeMiddleware(middlewares) {
  if (middlewares.length === 0) return (store) => (dispatch) => dispatch
  if (middlewares.length === 1) return middlewares[0]
  return (store) => (next) => {
    let handleAction = middlewares.reduceRight(
      (next, handler) => handler(store)(next),
      next
    )
    if (process.env.NODE_ENV !== 'production')
      handleAction = addCreationStack(handleAction, 'middleware')
    return handleAction
  }
}

function composeActionHandlers(actionHandlers) {
  return createMiddleware(mapValues(actionHandlers, naiveComposeMiddleware))
}

export function combineMiddlewareWithActionHandlers(...middlewares) {
  if (process.env.NODE_ENV !== 'production')
    checkForNonFunctions(middlewares, 'middlewares')

  const optimizedMiddlewares = []
  let actionHandlers = {}

  middlewares.forEach((middleware) => {
    if (middleware.actionHandlers) {
      forEach(middleware.actionHandlers, (actionHandler, type) => {
        ;(actionHandlers[type] || (actionHandlers[type] = [])).push(
          actionHandler
        )
      })
    } else {
      if (size(actionHandlers)) {
        optimizedMiddlewares.push(composeActionHandlers(actionHandlers))
        actionHandlers = {}
      }
      optimizedMiddlewares.push(middleware)
    }
  })
  if (size(actionHandlers))
    optimizedMiddlewares.push(composeActionHandlers(actionHandlers))

  return optimizedMiddlewares
}

export default function composeMiddleware(...middlewares) {
  return naiveComposeMiddleware(
    combineMiddlewareWithActionHandlers(...middlewares)
  )
}
