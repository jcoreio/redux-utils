import type { AnyAction, Reducer } from 'redux'

export default function createReducer<S = any, A extends AnyAction = AnyAction>(
  initialState: S,
  actionHandlers: Record<string, Reducer<S, A>>
): Reducer<S, A>
export default function createReducer<S = any, A extends AnyAction = AnyAction>(
  actionHandlers: Record<string, Reducer<S, A>>
): Reducer<S, A>
export default function createReducer<S = any, A extends AnyAction = AnyAction>(
  initialState: S,
  actionHandlers: Record<string, Reducer<S, A>>
): Reducer<S, A>
