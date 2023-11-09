import { Reducer } from 'redux'

export function combineReducersWithActionHandlers<S>(
  ...reducers: Reducer<S>[]
): Reducer<S>

export default function composeReducers<S>(
  ...reducers: Reducer<S>[]
): Reducer<S>[]
