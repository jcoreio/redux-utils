//@ts-nocheck
import { mapKeys } from 'lodash'
import createReducer from './createReducer'
import addCreationStack from './addCreationStack'
export default function prefixReducer(prefix: any) {
  return (reducer: any) => {
    if (reducer.actionHandlers instanceof Object) {
      return createReducer(
        reducer.initialState,
        mapKeys(reducer.actionHandlers, (handler, key) => prefix + key)
      )
    }

    let result = (state: any, action: any) =>
      typeof action.type === 'string' && action.type.startsWith(prefix)
        ? reducer(state, {
            ...action,
            type: action.type.substring(prefix.length),
          })
        : state

    if (process.env.NODE_ENV !== 'production')
      result = addCreationStack(result, 'reducer')
    return result
  }
}
