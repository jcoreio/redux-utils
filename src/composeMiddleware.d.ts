import { Dispatch, Middleware } from 'redux'

export function combineMiddlewareWithActionHandlers<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  ...middlewares: Middleware<DispatchExt, S, D>[]
): Middleware<DispatchExt, S, D>

export default function composeMiddleware<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  ...middlewares: Middleware<DispatchExt, S, D>[]
): Middleware<DispatchExt, S, D>
