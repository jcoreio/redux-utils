import {expect} from 'chai'
import createMiddleware from '../src/createMiddleware'
import composeMiddleware from '../src/composeMiddleware'

describe('composeMiddleware', () => {
  it('composes middleware without actionHandlers properly', () => {
    let index = 0
    let callsA = []
    let callsB = []
    let middlewareA = store => next => action => callsA.push({store, action, index: index++}) && next(action)
    let middlewareB = store => next => action => callsB.push({store, action, index: index++}) && next(action)
    let middleware = composeMiddleware(middlewareA, middlewareB)

    let store = {store: true}
    let callsNext = []
    let next = action => callsNext.push({action, index: index++})

    let action = {type: 'a'}
    middleware(store)(next)(action)
    expect(callsA).to.deep.equal([{store, action, index: 0}])
    expect(callsB).to.deep.equal([{store, action, index: 1}])
    expect(callsNext).to.deep.equal([{action, index: 2}])
  })
  it('composes middleware with actionHandlers properly', () => {
    let index = 0
    let callsA1 = []
    let callsA2 = []
    let callsB1 = []
    let callsB2 = []
    let callsC1 = []
    let middlewareA1 = store => next => action => callsA1.push({store, action, index: index++}) && next(action)
    let middlewareA2 = store => next => action => callsA2.push({store, action, index: index++}) && next(action)
    let middlewareB1 = store => next => action => callsB1.push({store, action, index: index++}) && next(action)
    let middlewareB2 = store => next => action => callsB2.push({store, action, index: index++}) && next(action)
    let middlewareC1 = store => next => action => callsC1.push({store, action, index: index++}) && next(action)

    let middleware1 = createMiddleware({
      a: middlewareA1,
      b: middlewareB1,
      c: middlewareC1,
    })
    let middleware2 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    })
    let middleware = composeMiddleware(middleware1, middleware2)
    expect(middleware.actionHandlers.a).to.be.an.instanceof(Function)
    expect(middleware.actionHandlers.b).to.be.an.instanceof(Function)
    expect(middleware.actionHandlers.c).to.be.an.instanceof(Function)

    let store = {store: true}
    let callsNext = []
    let next = action => callsNext.push({action, index: index++})

    let action = {type: 'a'}
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([{store, action, index: 0}])
    expect(callsA2).to.deep.equal([{store, action, index: 1}])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{action, index: 2}])

    index = 0
    callsA1 = []
    callsA2 = []
    callsNext = []
    action = {type: 'b'}
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([{store, action, index: 0}])
    expect(callsB2).to.deep.equal([{store, action, index: 1}])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{action, index: 2}])

    index = 0
    callsB1 = []
    callsB2 = []
    callsNext = []
    action = {type: 'c'}
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([{store, action, index: 0}])
    expect(callsNext).to.deep.equal([{action, index: 1}])
  })
  it('composes a mix of middleware with and without actionHandlers properly', () => {
    let index = 0
    let callsA1 = []
    let callsA2 = []
    let callsB1 = []
    let callsB2 = []
    let callsC1 = []
    let calls3 = []
    let middlewareA1 = store => next => action => callsA1.push({store, action, index: index++}) && next(action)
    let middlewareA2 = store => next => action => callsA2.push({store, action, index: index++}) && next(action)
    let middlewareB1 = store => next => action => callsB1.push({store, action, index: index++}) && next(action)
    let middlewareB2 = store => next => action => callsB2.push({store, action, index: index++}) && next(action)
    let middlewareC1 = store => next => action => callsC1.push({store, action, index: index++}) && next(action)

    let middleware1 = createMiddleware({
      a: middlewareA1,
      b: middlewareB1,
      c: middlewareC1,
    })
    let middleware2 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    })
    let middleware3 = store => next => action => calls3.push({store, action, index: index++}) && next(action)

    let middleware = composeMiddleware(middleware1, middleware3, middleware2)
    expect(middleware.actionHandlers).to.be.undefined

    let store = {store: true}
    let callsNext = []
    let next = action => callsNext.push({action, index: index++})

    let action = {type: 'a'}
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([{store, action, index: 0}])
    expect(calls3).to.deep.equal([{store, action, index: 1}])
    expect(callsA2).to.deep.equal([{store, action, index: 2}])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{action, index: 3}])

    index = 0
    callsA1 = []
    callsA2 = []
    calls3 = []
    callsNext = []
    action = {type: 'b'}
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([{store, action, index: 0}])
    expect(calls3).to.deep.equal([{store, action, index: 1}])
    expect(callsB2).to.deep.equal([{store, action, index: 2}])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{action, index: 3}])

    index = 0
    callsB1 = []
    callsB2 = []
    calls3 = []
    callsNext = []
    action = {type: 'c'}
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([{store, action, index: 0}])
    expect(calls3).to.deep.equal([{store, action, index: 1}])
    expect(callsNext).to.deep.equal([{action, index: 2}])
  })
})
