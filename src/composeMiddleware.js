import every from 'lodash.every'
import forEach from 'lodash.foreach'
import mapValues from 'lodash.mapvalues'
import createMiddleware from './createMiddleware'

export default function composeMiddleware(...middlewares) {
  if (middlewares.length === 0) return store => dispatch => dispatch
  if (middlewares.length === 1) return middlewares[0]

  if (every(middlewares, middleware => middleware.actionHandlers)) {
    // regroup all the action handlers in the middlewares by action type.
    let actionHandlers = {}
    middlewares.forEach(middleware => {
      forEach(middleware.actionHandlers, (actionHandler, type) => {
        (actionHandlers[type] || (actionHandlers[type] = [])).push(actionHandler)
      })
    })
    return createMiddleware(mapValues(actionHandlers, typeHandlers => composeMiddleware(...typeHandlers)))
  }
  return store => next => middlewares.reduceRight((next, handler) => handler(store)(next), next)
}
