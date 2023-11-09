import { Middleware } from 'redux'

export function combineMiddlewareWithActionHandlers(
  ...middlewares: Middleware[]
): Middleware

export default function composeMiddleware(
  ...middlewares: Middleware[]
): Middleware
