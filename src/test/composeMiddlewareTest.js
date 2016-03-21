import createMiddleware from '../lib/createMiddleware';
import composeMiddleware from '../lib/composeMiddleware';

describe('composeMiddleware', () => {
  it('composes middleware without actionHandlers properly', () => {
    let index = 0;
    let callsA = [];
    let callsB = [];
    let middlewareA = store => next => action => callsA.push({store, next, action, index: index++}) && next(action);
    let middlewareB = store => next => action => callsB.push({store, next, action, index: index++}) && next(action);
    let middleware = composeMiddleware(middlewareA, middlewareB);

    let store = {store: true};
    let callsNext = [];
    let next = action => callsNext.push({action, index: index++});

    let action = {type: 'a'};
    middleware(store)(next)(action);
    expect(callsA).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(callsB).toEqual([{store, next: jasmine.any(Function), action, index: 1}]);
    expect(callsNext).toEqual([{action, index: 2}]);
  });
  it('composes middleware with actionHandlers properly', () => {
    let index = 0;
    let callsA1 = [];
    let callsA2 = [];
    let callsB1 = [];
    let callsB2 = [];
    let callsC1 = [];
    let middlewareA1 = store => next => action => callsA1.push({store, next, action, index: index++}) && next(action);
    let middlewareA2 = store => next => action => callsA2.push({store, next, action, index: index++}) && next(action);
    let middlewareB1 = store => next => action => callsB1.push({store, next, action, index: index++}) && next(action);
    let middlewareB2 = store => next => action => callsB2.push({store, next, action, index: index++}) && next(action);
    let middlewareC1 = store => next => action => callsC1.push({store, next, action, index: index++}) && next(action);

    let middleware1 = createMiddleware({
      a: middlewareA1,
      b: middlewareB1,
      c: middlewareC1,
    });
    let middleware2 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    });
    let middleware = composeMiddleware(middleware1, middleware2);
    expect(middleware.actionHandlers).toEqual({
      a: jasmine.any(Function),
      b: jasmine.any(Function),
      c: jasmine.any(Function),
    });

    let store = {store: true};
    let callsNext = [];
    let next = action => callsNext.push({action, index: index++});

    let action = {type: 'a'};
    middleware(store)(next)(action);
    expect(callsA1).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(callsA2).toEqual([{store, next: jasmine.any(Function), action, index: 1}]);
    expect(callsB1).toEqual([]);
    expect(callsB2).toEqual([]);
    expect(callsC1).toEqual([]);
    expect(callsNext).toEqual([{action, index: 2}]);

    index = 0;
    callsA1 = [];
    callsA2 = [];
    callsNext = [];
    action = {type: 'b'};
    middleware(store)(next)(action);
    expect(callsA1).toEqual([]);
    expect(callsA2).toEqual([]);
    expect(callsB1).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(callsB2).toEqual([{store, next: jasmine.any(Function), action, index: 1}]);
    expect(callsC1).toEqual([]);
    expect(callsNext).toEqual([{action, index: 2}]);

    index = 0;
    callsB1 = [];
    callsB2 = [];
    callsNext = [];
    action = {type: 'c'};
    middleware(store)(next)(action);
    expect(callsA1).toEqual([]);
    expect(callsA2).toEqual([]);
    expect(callsB1).toEqual([]);
    expect(callsB2).toEqual([]);
    expect(callsC1).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(callsNext).toEqual([{action, index: 1}]);
  });
  it('composes a mix of middleware with and without actionHandlers properly', () => {
    let index = 0;
    let callsA1 = [];
    let callsA2 = [];
    let callsB1 = [];
    let callsB2 = [];
    let callsC1 = [];
    let calls3  = [];
    let middlewareA1 = store => next => action => callsA1.push({store, next, action, index: index++}) && next(action);
    let middlewareA2 = store => next => action => callsA2.push({store, next, action, index: index++}) && next(action);
    let middlewareB1 = store => next => action => callsB1.push({store, next, action, index: index++}) && next(action);
    let middlewareB2 = store => next => action => callsB2.push({store, next, action, index: index++}) && next(action);
    let middlewareC1 = store => next => action => callsC1.push({store, next, action, index: index++}) && next(action);

    let middleware1 = createMiddleware({
      a: middlewareA1,
      b: middlewareB1,
      c: middlewareC1,
    });
    let middleware2 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    });
    let middleware3 = store => next => action => calls3.push({store, next, action, index: index++}) && next(action);

    let middleware = composeMiddleware(middleware1, middleware3, middleware2);
    expect(middleware.actionHandlers).toBeUndefined();

    let store = {store: true};
    let callsNext = [];
    let next = action => callsNext.push({action, index: index++});

    let action = {type: 'a'};
    middleware(store)(next)(action);
    expect(callsA1).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(calls3).toEqual([{store, next: jasmine.any(Function), action, index: 1}]);
    expect(callsA2).toEqual([{store, next: jasmine.any(Function), action, index: 2}]);
    expect(callsB1).toEqual([]);
    expect(callsB2).toEqual([]);
    expect(callsC1).toEqual([]);
    expect(callsNext).toEqual([{action, index: 3}]);

    index = 0;
    callsA1 = [];
    callsA2 = [];
    calls3  = [];
    callsNext = [];
    action = {type: 'b'};
    middleware(store)(next)(action);
    expect(callsA1).toEqual([]);
    expect(callsA2).toEqual([]);
    expect(callsB1).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(calls3).toEqual([{store, next: jasmine.any(Function), action, index: 1}]);
    expect(callsB2).toEqual([{store, next: jasmine.any(Function), action, index: 2}]);
    expect(callsC1).toEqual([]);
    expect(callsNext).toEqual([{action, index: 3}]);

    index = 0;
    callsB1 = [];
    callsB2 = [];
    calls3  = [];
    callsNext = [];
    action = {type: 'c'};
    middleware(store)(next)(action);
    expect(callsA1).toEqual([]);
    expect(callsA2).toEqual([]);
    expect(callsB1).toEqual([]);
    expect(callsB2).toEqual([]);
    expect(callsC1).toEqual([{store, next: jasmine.any(Function), action, index: 0}]);
    expect(calls3).toEqual([{store, next: jasmine.any(Function), action, index: 1}]);
    expect(callsNext).toEqual([{action, index: 2}]);
  });
});