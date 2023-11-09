import type { Reducer } from 'redux'

export default function createReducer<S>(
  initialState: S,
  actionHandlers: Record<string, Reducer<S>>
): Reducer<S>
export default function createReducer<S>(
  actionHandlers: Record<string, Reducer<S>>
): Reducer<S>
export default function createReducer<S>(
  initialState: S,
  actionHandlers: Record<string, Reducer<S>>
): Reducer<S>
