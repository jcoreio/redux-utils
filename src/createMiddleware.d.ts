import { Middleware } from 'redux'

export default function createMiddleware(
  actionHandlers: Record<string, Middleware>
): Middleware
