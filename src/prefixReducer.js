import mapKeys from 'lodash.mapkeys'
import createReducer from './createReducer'
import addCreationStack from './addCreationStack'

export default function prefixReducer(prefix) {
  return reducer => {
    if (reducer.actionHandlers instanceof Object) {
      return createReducer(reducer.initialState, mapKeys(reducer.actionHandlers, (handler, key) => prefix + key))
    }
    let result = (state, action) => typeof action.type === 'string' && action.type.startsWith(prefix)
      ? reducer(state, {...action, type: action.type.substring(prefix.length)})
      : state

    if (process.env.NODE_ENV !== 'production') result = addCreationStack(result, 'reducer')
    return result
  }
}

