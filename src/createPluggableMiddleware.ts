//@ts-nocheck
import { memoize } from 'lodash'
import checkForNonFunctions from './checkForNonFunctions'
/**
 * This is used for hot reloading redux middleware.
 *
 * let hmrMiddleware = createPluggableMiddleware(myMiddleware);
 * // hmrMiddleware can be used with applyMiddleware() just like anything else.
 * // but later if you need to replace it you can do:
 * hmrMiddleware.replaceMiddleware(myNewMiddleware);
 */

export default function createPluggableMiddleware(middleware: any) {
  if (process.env.NODE_ENV !== 'production')
    checkForNonFunctions(middleware, 'middleware')

  const result = (store: any) => (next: any) => {
    const dispatch = memoize((middleware) =>
      middleware ? middleware(store)(next) : next
    )
    return (action: any) => dispatch(middleware)(action)
  }

  result.replaceMiddleware = (nextMiddleware: any) => {
    if (process.env.NODE_ENV !== 'production')
      checkForNonFunctions(nextMiddleware, 'nextMiddleware')
    middleware = nextMiddleware
  }

  return result
}
