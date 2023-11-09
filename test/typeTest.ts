/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware, Reducer, applyMiddleware, createStore } from 'redux'
import { composeMiddleware, composeReducers, createReducer } from '../src'

export const LOGIN = 'login'
export const LOGOUT = 'logout'

export type LoginAction = {
  type: typeof LOGIN
  payload: {
    password: string
  }
}
export type LogoutAction = {
  type: typeof LOGOUT
  error?: true
  payload?: {
    error?: string
  }
}

export type AuthAction = LoginAction | LogoutAction

export type Auth = {
  error: string | undefined
}

export const reducer1: Reducer<Auth, AuthAction> = createReducer<
  Auth,
  AuthAction
>(
  { error: undefined },
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LOGIN]: (state, action) => ({
      error: undefined,
    }),
    [LOGOUT]: (state, { payload }) => ({
      error: payload?.error,
    }),
  }
)

export const reducer2: Reducer<Auth, AuthAction> = createReducer<
  Auth,
  AuthAction
>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [LOGIN]: (state, action) => ({
    error: undefined,
  }),
  [LOGOUT]: (state, { payload }) => ({
    error: payload?.error,
  }),
})

export const reducer3: Reducer<Auth, AuthAction> = createReducer<
  Auth,
  AuthAction
>(
  { error: undefined },
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LOGIN]: (state: Auth, action: LoginAction) => ({
      error: undefined,
    }),
    [LOGOUT]: (state: Auth, { payload }: LogoutAction) => ({
      error: payload?.error,
    }),
  }
)

export const reducer4: Reducer<Auth, AuthAction> = createReducer<
  Auth,
  AuthAction
>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [LOGIN]: (state: Auth | undefined, action: LoginAction) => ({
    error: undefined,
  }),
  [LOGOUT]: (state: Auth | undefined, { payload }: LogoutAction) => ({
    error: payload?.error,
  }),
})

export const reducer5 = composeReducers(
  createReducer<Auth, LoginAction>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LOGIN]: (state: Auth | undefined, action: LoginAction) => ({
      error: undefined,
    }),
  }),
  createReducer<Auth, LogoutAction>({
    [LOGOUT]: (state: Auth | undefined, { payload }: LogoutAction) => ({
      error: payload?.error,
    }),
  })
)

export const reducer6: Reducer<Auth, AuthAction> = composeReducers(
  createReducer<Auth, LoginAction>({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LOGIN]: (state: Auth | undefined, action: LoginAction) => ({
      error: undefined,
    }),
  }),
  createReducer<Auth, LogoutAction>({
    [LOGOUT]: (state: Auth | undefined, { payload }: LogoutAction) => ({
      error: payload?.error,
    }),
  })
)

type AsyncAction<V> = {
  type: 'async'
  perform: () => Promise<V>
}

const asyncActionMiddleware: Middleware<
  {
    <V>(action: AsyncAction<V>): Promise<V>
  },
  Auth
> = (store) => (next) => (action) => null as any

type FooAction = {
  type: 'foo'
}

const fooActionMiddleware: Middleware<
  {
    (action: FooAction): 'foo'
  },
  Auth
> = (store) => (next) => (action) => null as any

const store = applyMiddleware(
  composeMiddleware(asyncActionMiddleware, fooActionMiddleware)
)(createStore)(reducer1)

const value1: 'foo' = store.dispatch({ type: 'foo' })
const value2: Promise<number> = store.dispatch({
  type: 'async',
  perform: async () => 3,
})
const value3: LoginAction = store.dispatch({
  type: 'login',
  payload: { password: 'foo' },
})
