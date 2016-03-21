## createReducer([initialState: any,] actionHandlers: {[actionType: string]: Reducer}): Reducer
```js
import {createReducer} from 'mindfront-redux-utils';
```

Creates a reducer that delegates to `actionHandlers[action.type]`, if it exists, and otherwise, returns `state`.
If `initialState` is provided, it will be used as the initial state if the reducer is called with undefined
initial state.

The returned reducer will also have `initialState` and `actionHandlers` as own properties (primarily so that
composeReducers can efficiently compose action map reducers).

## composeReducers(...reducers: Reducer[]): Reducer
```js
import {composeReducers} from 'mindfront-redux-utils';
```

Creates a reducer that applies all the provided reducers.

If all the reducers have an `actionHandlers` property that is an object (for instance reducers made with 
`createReducer`), `composeReducers` will compose them efficiently: it will group the action handlers by type, 
compose the handlers for each type separately, and then use `createReducer` on the composed action handlers, 
and initial state from the first reducer for which `initialState` is defined.

## createMiddleware(actionHandlers: {[actionType: string]: Middleware}): Middleware
```js
import {createMiddleware} from 'mindfront-redux-utils';
```

Creates middleware that delegates to `actionHandlers[action.type]`, if it exists, and otherwise, 
returns `next(action)`.

The returned middleware will also have `actionHandlers` as an own property.

## composeMiddleware(...middlewares: Middleware[]): Middleware
```js
import {composeMiddleware} from 'mindfront-redux-utils';
```

Composes middleware just like `applyMiddleware` from Redux, but returns a middleware that delegates to the
composed arguments rather than a store decorator.

If all the middleware have an `actionHandlers` property that is an object (for instance middleware made with
`createMiddleware`), `composeMiddleware` will compose them efficiently: it will group the action handlers by
type, compose the handlers for each type separately, and then use `createMiddleware` on the composed action
handlers.

## createPluggableMiddleware(initialMiddleware: Middleware): Middleware
```js
import {createPluggableMiddleware} from 'mindfront-redux-utils';
```

Creates a middleware that delegates to a hot-swappable middleware.  The returned middleware will have a
`replaceMiddleware(nextMiddleware: Middleware)` function.  This way you can use Webpack hot reloading on
your custom middleware.
