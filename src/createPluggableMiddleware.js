import {memoize} from 'lodash'

/**
 * This is used for hot reloading redux middleware.
 *
 * let hmrMiddleware = createPluggableMiddleware(myMiddleware);
 * // hmrMiddleware can be used with applyMiddleware() just like anything else.
 * // but later if you need to replace it you can do:
 * hmrMiddleware.replaceMiddleware(myNewMiddleware);
 */
export default function createPluggableMiddleware(middleware) {
  const result = store => next => {
    const dispatch = memoize(middleware => middleware ? middleware(store)(next) : next)
    return action => dispatch(middleware)(action)
  }
  result.replaceMiddleware = nextMiddleware => middleware = nextMiddleware
  return result
}
