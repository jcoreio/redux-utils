import { size } from "lodash"
import checkForNonFunctions from './checkForNonFunctions'
import addCreationStack from './addCreationStack'

export default function createReducer(initialState, actionHandlers) {
  if (arguments.length === 1) {
    actionHandlers = initialState
    initialState = undefined
  }

  if (process.env.NODE_ENV !== 'production') {
    checkForNonFunctions(actionHandlers, 'actionHandlers')
  }

  let result
  if (size(actionHandlers)) {
    result = (state = initialState, action) => {
      let reducer = actionHandlers[action.type]
      return reducer ? reducer(state, action) : state
    }
  }
  else {
    result = (state = initialState) => state
  }
  if (process.env.NODE_ENV !== 'production') result = addCreationStack(result, 'reducer')
  result.initialState = initialState
  result.actionHandlers = actionHandlers
  return result
}
