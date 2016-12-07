import mapKeys from 'lodash.mapkeys'
import createReducer from './createReducer'

export default function prefixReducerActionTypes(prefix) {
  return reducer => {
    if (reducer.actionHandlers instanceof Object) {
      return createReducer(reducer.initialState, mapKeys(reducer.actionHandlers, (handler, key) => prefix + key))
    }
    return (state, action) => action.type.startsWith(prefix)
      ? reducer(state, {...action, type: action.type.substring(prefix.length)})
      : state
  }
}

