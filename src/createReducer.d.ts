import type { AnyAction, Reducer } from 'redux'

type HandlersStateType<
  Handlers extends Record<string, (state: any, action: any) => any>
> = ReducerStateType<Handlers[keyof Handlers]>

export type ReducerStateType<Reducer> = Reducer extends (
  state: infer S0,
  action: any
) => infer S1
  ? Exclude<S0, undefined> | S1
  : never

type HandlersActionType<
  Handlers extends Record<string, (state: any, action: any) => any>
> = ReducerActionType<Handlers[keyof Handlers]>

export type ReducerActionType<Reducer> = Reducer extends (
  state: any,
  action: infer A extends AnyAction
) => any
  ? A
  : never

type AnyCoalesce<T, U> = 0 extends 1 & T ? U : T

type ActionHandlers<S = any, A extends AnyAction = AnyAction> = {
  [T in A['type']]?: (
    state: S | undefined,
    action: Extract<A, { type: T }>
  ) => S
}

type InitializedActionHandlers<S = any, A extends AnyAction = AnyAction> = {
  [T in A['type']]?: (state: S, action: Extract<A, { type: T }>) => S
}

export default function createReducer<S = any, A extends AnyAction = AnyAction>(
  initialState: S,
  actionHandlers: InitializedActionHandlers<S, A>
): Reducer<S, A>
export default function createReducer<S = any, A extends AnyAction = AnyAction>(
  actionHandlers: ActionHandlers<S, A>
): Reducer<S, A>
