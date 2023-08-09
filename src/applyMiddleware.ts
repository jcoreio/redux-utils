import { combineMiddlewareWithActionHandlers } from './composeMiddleware'
import { applyMiddleware as naiveApplyMiddleware } from 'redux'

export default function applyMiddleware(...middlewares) {
  return naiveApplyMiddleware(
    ...combineMiddlewareWithActionHandlers(...middlewares)
  )
}
