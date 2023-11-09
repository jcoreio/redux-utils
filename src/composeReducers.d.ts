import { AnyAction, Reducer } from 'redux'

export function combineReducersWithActionHandlers<
  S = any,
  A extends AnyAction = AnyAction
>(...reducers: Reducer<S, A>[]): Reducer<S, A>

export default function composeReducers<
  S = any,
  A extends AnyAction = AnyAction
>(...reducers: Reducer<S, A>[]): Reducer<S, A>[]
