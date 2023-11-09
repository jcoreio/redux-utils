import { Middleware } from 'redux'

/**
 * This is used for hot reloading redux middleware.
 *
 * let hmrMiddleware = createPluggableMiddleware(myMiddleware);
 * // hmrMiddleware can be used with applyMiddleware() just like anything else.
 * // but later if you need to replace it you can do:
 * hmrMiddleware.replaceMiddleware(myNewMiddleware);
 */
export default function createPluggableMiddleware(
  middleware: Middleware
): Middleware & { replaceMiddleware(nextMiddleware: Middleware): void }
