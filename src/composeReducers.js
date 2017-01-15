import reduce from 'lodash.reduce'
import every from 'lodash.every'
import forEach from 'lodash.foreach'
import mapValues from 'lodash.mapvalues'
import createReducer from './createReducer'
import checkForNonFunctions from './checkForNonFunctions'
import addCreationStack from './addCreationStack'

export default function composeReducers(...reducers) {
  if (process.env.NODE_ENV !== 'production') checkForNonFunctions(reducers, 'reducers')

  let result
  if (reducers.length === 0) result = state => state
  if (reducers.length === 1) result = reducers[0]

  // if all reducers have actionHandlers maps, merge the maps using composeReducers
  else if (every(reducers, reducer => reducer.actionHandlers instanceof Object)) {
    let actionHandlers = {}
    let initialState
    reducers.forEach(reducer => {
      if (initialState === undefined) initialState = reducer.initialState
      forEach(reducer.actionHandlers, (actionHandler, type) => {
        (actionHandlers[type] || (actionHandlers[type] = [])).push(actionHandler)
      })
    })
    return createReducer(initialState, mapValues(actionHandlers,
      typeHandlers => composeReducers(...typeHandlers)))
  } else {
    result = (state, action) => reduce(reducers, (state, reducer) => reducer(state, action), state)
  }
  if (process.env.NODE_ENV !== 'production') result = addCreationStack(result, 'reducer')

  return result
}
