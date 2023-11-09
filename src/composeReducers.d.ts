import { AnyAction, Reducer } from 'redux'

type ReducerStateType<Reducer> = Reducer extends (
  state: undefined | infer S0 extends {},
  action: any
) => infer S1
  ? S0 | S1
  : Reducer extends (state: infer S0 extends {}, action: any) => infer S1
  ? S0 | S1
  : never

type ReducerActionType<Reducer> = Reducer extends (
  state: any,
  action: infer A extends AnyAction
) => any
  ? A
  : never

export function combineReducersWithActionHandlers<
  Reducers extends Reducer<any, any>[]
>(...reducers: Reducers): composeReducers<Reducers>

type composeReducers<Reducers extends Reducer<any, any>[]> = Reducer<
  ReducerStateType<Reducers[number]>,
  ReducerActionType<Reducers[number]>
>

declare function composeReducers<Reducers extends Reducer<any, any>[]>(
  ...reducers: Reducers
): composeReducers<Reducers>

export default composeReducers
