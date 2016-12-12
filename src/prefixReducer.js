import mapKeys from 'lodash.mapkeys'
import createReducer from './createReducer'

export default function prefixReducer(prefix) {
  return reducer => {
    if (reducer.actionHandlers instanceof Object) {
      return createReducer(reducer.initialState, mapKeys(reducer.actionHandlers, (handler, key) => prefix + key))
    }
    return (state, action) => typeof action.type === 'string' && action.type.startsWith(prefix)
      ? reducer(state, {...action, type: action.type.substring(prefix.length)})
      : state
  }
}

