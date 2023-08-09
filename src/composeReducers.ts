//@ts-nocheck
import { size, forEach, mapValues } from 'lodash'
import createReducer from './createReducer'
import addCreationStack from './addCreationStack'
import checkForNonFunctions from './checkForNonFunctions'
/**
 * @param reducers an array of one or more reducers.
 * @returns a reducer that calls all of the given reducers in sequence.
 */

function naiveComposeReducers(reducers: any) {
  if (reducers.length === 0) return (state: any) => state
  if (reducers.length === 1) return reducers[0]
  const initialState = reducers.reduce(
    (state, reducer) => reducer(state, { type: '' }),
    undefined
  )
  return (state = initialState, action: any) =>
    reducers.reduce((state, reducer) => reducer(state, action), state)
}

function composeActionHandlers(initialState: any, actionHandlers: any) {
  return createReducer(
    initialState,
    mapValues(actionHandlers, naiveComposeReducers)
  )
}

export function combineReducersWithActionHandlers(...reducers) {
  if (process.env.NODE_ENV !== 'production')
    checkForNonFunctions(reducers, 'reducers')
  const optimizedReducers: any = []
  let initialState = undefined
  let actionHandlers: Record<string, any> = {}
  reducers.forEach((reducer) => {
    if (reducer.actionHandlers) {
      initialState = reducer(initialState, { type: '' })
      forEach(reducer.actionHandlers, (actionHandler, type) => {
        ;(actionHandlers[type] || (actionHandlers[type] = [])).push(
          actionHandler
        )
      })
    } else {
      if (size(actionHandlers)) {
        optimizedReducers.push(
          composeActionHandlers(initialState, actionHandlers)
        )
        actionHandlers = {}
        initialState = undefined
      }
      optimizedReducers.push(reducer)
    }
  })
  if (size(actionHandlers))
    optimizedReducers.push(composeActionHandlers(initialState, actionHandlers))
  return optimizedReducers
}
export default function composeReducers(...reducers) {
  let result = naiveComposeReducers(
    combineReducersWithActionHandlers(...reducers)
  )
  if (process.env.NODE_ENV !== 'production')
    result = addCreationStack(result, 'reducer')
  return result
}
