import { Dispatch, Middleware } from 'redux'

export default function createMiddleware<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  actionHandlers: Record<string, Middleware<DispatchExt, S, D>>
): Middleware<DispatchExt, S, D>
