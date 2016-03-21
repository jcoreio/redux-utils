import createMiddleware from '../lib/createMiddleware';

describe('createMiddleware', () => {
  it('calls next(action) if no actionHandlers are provided', () => {
    let store = {
      dispatch() {}
    };
    let middleware = createMiddleware({});
    let next = jasmine.createSpy('next');
    middleware(store)(next)({type: 'action'});
    expect(next.calls.allArgs()).toEqual([[{type: 'action'}]]);
  });
  it('returns a function with an actionHandlers property', () => {
    let middlewareA = store => next => action => next(action);
    let middlewareB = store => next => action => next(action);
    let actionHandlers = {
      a: middlewareA,
      b: middlewareB,
    };
    let middleware = createMiddleware(actionHandlers);
    expect(middleware.actionHandlers).toBe(actionHandlers);
    expect(middleware instanceof Function).toBeTruthy();
  });
  it('calls the correct middleware', () => {
    let callsA = [];
    let callsB = [];
    let middlewareA = store => next => action => callsA.push({store, next, action}) && next(action);
    let middlewareB = store => next => action => callsB.push({store, next, action}) && next(action);
    let middleware = createMiddleware({
      a: middlewareA,
      b: middlewareB,
    });

    let store = {store: true};
    let callsNext = [];
    let next = action => callsNext.push({action});

    let action = {type: 'a'};
    middleware(store)(next)(action);
    expect(callsA).toEqual([{store, next, action}]);
    expect(callsB).toEqual([]);
    expect(callsNext).toEqual([{action}]);

    callsA = [];
    callsB = [];
    callsNext = [];

    action = {type: 'b'};
    middleware(store)(next)(action);
    expect(callsA).toEqual([]);
    expect(callsB).toEqual([{store, next, action}]);
    expect(callsNext).toEqual([{action}]);
  });
});
