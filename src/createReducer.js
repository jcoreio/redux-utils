import {keys} from 'lodash'

export default function createReducer(initialState, actionHandlers) {
  if (arguments.length === 1) {
    actionHandlers = initialState
    initialState = undefined
  }

  let result
  if (keys(actionHandlers).length) {
    result = (state = initialState, action) => {
      let reducer = actionHandlers[action.type]
      return reducer ? reducer(state, action) : state
    }
  }
  else {
    result = (state = initialState) => state
  }
  result.initialState = initialState
  result.actionHandlers = actionHandlers
  return result
}
