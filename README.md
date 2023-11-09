# mindfront-redux-utils

[![CircleCI](https://circleci.com/gh/jcoreio/redux-utils.svg?style=svg)](https://circleci.com/gh/jcoreio/redux-utils)
[![Coverage Status](https://codecov.io/gh/jcoreio/redux-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/redux-utils)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/mindfront-redux-utils.svg)](https://badge.fury.io/js/mindfront-redux-utils)

## Making Redux scalable

If you use [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html) to create your top-level reducer, it will call every one of your subreducers for every action you dispatch. This is easy to debug, and it ensures your state will update correctly, but it's easy to imagine how it will create performance problems.

Imagine you're combining 100 subreducers, and you're dispatching actions from a `mousemove` listener at 60 Hz. That's 6000 subreducer calls per second, and it only increases as you add more slices to your state and corresponding subreducers to your app.

This package and [`mindfront-redux-utils-immutable`](https://github.com/jcoreio/redux-utils-immutable) help you create and combine reducers and middleware in such a way that only the relevant subreducer(s) and middleware for a given action are called, so you don't have to worry that performance will decrease with every subreducer or sub-subreducer (etc) you add.

There is a downside to this approach: debugging is more difficult, because it's harder to trace where a subreducer is getting called from (or why it's not getting called). This package tries to mitigate that problem as much as it can by saving stack traces of where reducers were created and combined.

## Legacy build note

If you are building for legacy browsers with webpack or similar bundlers, make sure to add a rule
to transpile this package with babel.

## createReducer([initialState: any,] actionHandlers: {[actionType: string]: Reducer}): Reducer

```js
import { createReducer } from 'mindfront-redux-utils'
```

Creates a reducer that delegates to `actionHandlers[action.type]`, if it exists, and otherwise, returns `state`.
If `initialState` is provided, it will be used as the initial state if the reducer is called with undefined
initial state.

The returned reducer will also have `initialState` and `actionHandlers` as own properties (primarily so that
composeReducers can efficiently compose action map reducers).

## composeReducers(...reducers: Reducer[]): Reducer

```js
import { composeReducers } from 'mindfront-redux-utils'
```

Creates a reducer that applies all the provided reducers.

If any consecutive reducers have an `actionHandlers` property that is an object (for instance reducers made with
`createReducer`), `composeReducers` will compose them efficiently: it will group the action handlers by type,
compose the handlers for each type separately, and then use `createReducer` on the composed action handlers,
and initial state from the first reducer for which `initialState` is defined.

## createMiddleware(actionHandlers: {[actionType: string]: Middleware}): Middleware

```js
import { createMiddleware } from 'mindfront-redux-utils'
```

Creates middleware that delegates to `actionHandlers[action.type]`, if it exists, and otherwise,
returns `next(action)`.

The returned middleware will also have `actionHandlers` as an own property.

## composeMiddleware(...middlewares: Middleware[]): Middleware

```js
import { composeMiddleware } from 'mindfront-redux-utils'
```

Composes the given middlewares to be called one after another, just like Redux' `applyMiddleware`, but with one
optimization: sequences of consecutive middleware that have `actionHandlers` will be recombined into a single middleware
that calls any `actionHandlers` for a given action directly.

## applyMiddleware(...middlewares: Middleware[]): createStore => createStore'

**Requires `redux` as an optional dependency.**

```js
import applyMiddleware from 'mindfront-redux-utils/lib/applyMiddleware'
```

Just like `applyMiddleware` from `redux`, but applies the same optimization as `composeMiddleware`: sequences of
consecutive middleware that have `actionHandlers` will be recombined into a single middleware that calls any
`actionHandlers` for a given action directly.

## combineMiddlewareWithActionHandlers(...middlewares: Middleware[]): Middleware[]

```js
import { combineMiddlewareWithActionHandlers } from 'mindfront-redux-utils'
```

Replaces any sequences of consecutive middleware that have `actionHandlers` in the arguments with a single middleware
that calls the `actionHandlers` for a given action directly. (This is used by `composeMiddleware` under the hood).

## createPluggableMiddleware(initialMiddleware: Middleware): Middleware

```js
import { createPluggableMiddleware } from 'mindfront-redux-utils'
```

Creates a middleware that delegates to a hot-swappable middleware. The returned middleware will have a
`replaceMiddleware(nextMiddleware: Middleware)` function. This way you can use Webpack hot reloading on
your custom middleware.

## prefixReducer(prefix: string): (reducer: Reducer) => Reducer

```js
import { prefixReducer } from 'mindfront-redux-utils'
```

A reducer decorator that strips `prefix` from each `action.type` before passing it to the decorated `reducer`.
If the `action.type` doesn't start with `prefix`, it will just return the `state` instead of calling `reducer`.

If the decorated reducer has `actionHandlers` (from `createReducer`), then the returned reducer will have
`actionHandlers` with the prefixed action type keys.

### Example

```es6
import { combineReducers } from 'redux'
import { createReducer, prefixReducer } from 'mindfront-redux-utils'

const counterReducer = createReducer(0, {
  DECREMENT: (state) => state - 1,
  INCREMENT: (state) => state + 1,
})

const reducer = combineReducers({
  counter1: prefixReducer('COUNTER_1.')(counterReducer),
  counter2: prefixReducer('COUNTER_2.')(counterReducer),
})

reducer({}, { type: 'COUNTER_1.INCREMENT' }) // {counter1: 1}
reducer({ counter1: 3, counter2: 3 }, { type: 'COUNTER_1.DECREMENT' }) // {counter1: 2, counter2: 3}
reducer({ counter1: 3, counter2: 3 }, { type: 'COUNTER_2.INCREMENT' }) // {counter1: 3, counter2: 4}
```

## prefixActionCreator(prefix: string): (actionCreator: ActionCreator) => ActionCreator

```js
import { prefixActionCreator } from 'mindfront-redux-utils'
```

An action creator decorator that prepends `prefix` to the `type` of the created actions.

### Example

```es6
import { prefixActionCreator } from 'mindfront-redux-utils'

function setEntry(key, value) {
  return {
    type: 'SET_ENTRY',
    payload: value,
    meta: { key },
  }
}

const setConfigEntry = prefixActionCreator('CONFIG.')(setEntry)

setConfigEntry('hello', 'world').type // CONFIG.SET_ENTRY
```

## addMeta(meta: Object): (actionCreator: ActionCreator) => ActionCreator

```js
import { addMeta } from 'mindfront-redux-utils'
```

An action or action creator decorator that assigns additional properties to actions' `meta`.

### Example

```es6
import { addMeta } from 'mindfront-redux-utils'

function setEntry(key, value) {
  return {
    type: 'SET_ENTRY',
    payload: value,
    meta: { key },
  }
}

const forConfigDomain = addMeta({ domain: 'config' })

const setConfigEntry = forConfigDomain(setEntry)

setConfigEntry('hello', 'world').meta // {key: 'hello', domain: 'config'}

forConfigDomain(setEntry('hello', 'world')).meta // {key: 'hello', domain: 'config'}
```

## fullStack(error: Error, wrapped?: (error: Error) => string): string

Errors thrown from the sub-reducers you pass to `createReducer`, `composeReducers`, 'prefixReducer', or sub-middleware
you pass to `createMiddleware` or `composeMiddleware` normally don't include any information about where the associated
call to `createReducer` etc. occurred, making debugging difficult. However, in dev mode, `mindfront-redux-utils` adds
this info to the resulting reducers and middleware, and you can get it by calling `fullStack`, like so:

```js
import { createReducer, fullStack } from './src'

function hello() {
  throw new Error('TEST')
}
const r = createReducer({ hello })

try {
  r({}, { type: 'hello' })
} catch (e) {
  console.error(fullStack(e))
}
```

Output:

```
Error: TEST
    at hello (/Users/andy/redux-utils/temp.js:4:9)
    at result (/Users/andy/redux-utils/src/createReducer.js:19:24)
    at withCause (/Users/andy/redux-utils/src/addCreationStack.js:5:14)
    at Object.<anonymous> (/Users/andy/redux-utils/temp.js:9:3)
    at Module._compile (module.js:556:32)
    at loader (/Users/andy/redux-utils/node_modules/babel-register/lib/node.js:144:5)
    at Object.require.extensions.(anonymous function) [as .js] (/Users/andy/redux-utils/node_modules/babel-register/lib/node.js:154:7)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
Caused by reducer created at:
    at addCreationStack (/Users/andy/redux-utils/src/addCreationStack.js:2:21)
    at createReducer (/Users/andy/redux-utils/src/createReducer.js:25:55)
    at Object.<anonymous> (/Users/andy/redux-utils/temp.js:6:11)
    at Module._compile (module.js:556:32)
    at loader (/Users/andy/redux-utils/node_modules/babel-register/lib/node.js:144:5)
    at Object.require.extensions.(anonymous function) [as .js] (/Users/andy/redux-utils/node_modules/babel-register/lib/node.js:154:7)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Function.Module.runMain (module.js:590:10)
```

If you are using [VError](https://github.com/joyent/node-verror), you may pass VError's `fullStack` function as the
second argument to also include the cause chain from `VError`.
