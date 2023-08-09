//@ts-nocheck
import { expect } from 'chai'
import createMiddleware from '../src/createMiddleware'
import composeMiddleware from '../src/composeMiddleware'
import sinon from 'sinon'
describe('composeMiddleware', () => {
  it('returns pass-through middleware if no middlewares are given', () => {
    const dispatch = sinon.spy()
    const middleware = composeMiddleware()
    const store = { store: true } as const
    const action = { type: 'a' } as const
    middleware(store)(dispatch)(action)
    expect(dispatch.args).to.deep.equal([[action]])
  })
  it('composes middleware without actionHandlers properly', () => {
    let index = 0
    const callsA: any = []
    const callsB: any = []

    const middlewareA = (store: any) => (next: any) => (action: any) =>
      callsA.push({ store, action, index: index++ }) && next(action)

    const middlewareB = (store: any) => (next: any) => (action: any) =>
      callsB.push({ store, action, index: index++ }) && next(action)

    const middleware = composeMiddleware(middlewareA, middlewareB)
    const store = { store: true }
    const callsNext: any = []

    const next = (action: any) => callsNext.push({ action, index: index++ })

    const action = { type: 'a' }
    middleware(store)(next)(action)
    expect(callsA).to.deep.equal([{ store, action, index: 0 }])
    expect(callsB).to.deep.equal([{ store, action, index: 1 }])
    expect(callsNext).to.deep.equal([{ action, index: 2 }])
  })
  it('composes middleware with actionHandlers properly', () => {
    let index = 0
    let callsA1: any = []
    let callsA2: any = []
    let callsB1: any = []
    let callsB2: any = []
    const callsC1: any = []

    const middlewareA1 = (store: any) => (next: any) => (action: any) =>
      callsA1.push({ store, action, index: index++ }) && next(action)

    const middlewareA2 = (store: any) => (next: any) => (action: any) =>
      callsA2.push({ store, action, index: index++ }) && next(action)

    const middlewareB1 = (store: any) => (next: any) => (action: any) =>
      callsB1.push({ store, action, index: index++ }) && next(action)

    const middlewareB2 = (store: any) => (next: any) => (action: any) =>
      callsB2.push({ store, action, index: index++ }) && next(action)

    const middlewareC1 = (store: any) => (next: any) => (action: any) =>
      callsC1.push({ store, action, index: index++ }) && next(action)

    const middleware1 = createMiddleware({
      a: middlewareA1,
      b: middlewareB1,
      c: middlewareC1,
    })
    const middleware2 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    })
    const middleware = composeMiddleware(middleware1, middleware2)
    expect(middleware.actionHandlers.a).to.be.an.instanceof(Function)
    expect(middleware.actionHandlers.b).to.be.an.instanceof(Function)
    expect(middleware.actionHandlers.c).to.be.an.instanceof(Function)
    const store = { store: true }
    let callsNext: any = []

    const next = (action: any) => callsNext.push({ action, index: index++ })

    let action = { type: 'a' }
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([{ store, action, index: 0 }])
    expect(callsA2).to.deep.equal([{ store, action, index: 1 }])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{ action, index: 2 }])
    index = 0
    callsA1 = []
    callsA2 = []
    callsNext = []
    action = { type: 'b' }
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([{ store, action, index: 0 }])
    expect(callsB2).to.deep.equal([{ store, action, index: 1 }])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{ action, index: 2 }])
    index = 0
    callsB1 = []
    callsB2 = []
    callsNext = []
    action = { type: 'c' }
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([{ store, action, index: 0 }])
    expect(callsNext).to.deep.equal([{ action, index: 1 }])
  })
  it('composes a mix of middleware with and without actionHandlers properly', () => {
    let index = 0
    let callsA1: any = []
    let callsA2: any = []
    const callsA3: any = []
    let callsB1: any = []
    let callsB2: any = []
    const callsC1: any = []
    let calls3: any = []

    const middlewareA1 = (store: any) => (next: any) => (action: any) =>
      callsA1.push({ store, action, index: index++ }) && next(action)

    const middlewareA2 = (store: any) => (next: any) => (action: any) =>
      callsA2.push({ store, action, index: index++ }) && next(action)

    const middlewareA3 = (store: any) => (next: any) => (action: any) =>
      callsA3.push({ store, action, index: index++ }) && next(action)

    const middlewareB1 = (store: any) => (next: any) => (action: any) =>
      callsB1.push({ store, action, index: index++ }) && next(action)

    const middlewareB2 = (store: any) => (next: any) => (action: any) =>
      callsB2.push({ store, action, index: index++ }) && next(action)

    const middlewareC1 = (store: any) => (next: any) => (action: any) =>
      callsC1.push({ store, action, index: index++ }) && next(action)

    const middleware1 = createMiddleware({
      a: middlewareA1,
    })
    const middleware2 = createMiddleware({
      a: middlewareA3,
      b: middlewareB1,
      c: middlewareC1,
    })

    const middleware3 = (store: any) => (next: any) => (action: any) =>
      calls3.push({ store, action, index: index++ }) && next(action)

    const middleware4 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    })
    const middleware = composeMiddleware(
      middleware1,
      middleware2,
      middleware3,
      middleware4
    )
    expect(middleware.actionHandlers).to.be.undefined
    const store = { store: true }
    let callsNext: any = []

    const next = (action: any) => callsNext.push({ action, index: index++ })

    let action = { type: 'a' }
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([{ store, action, index: 0 }])
    expect(callsA3).to.deep.equal([{ store, action, index: 1 }])
    expect(calls3).to.deep.equal([{ store, action, index: 2 }])
    expect(callsA2).to.deep.equal([{ store, action, index: 3 }])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{ action, index: 4 }])
    index = 0
    callsA1 = []
    callsA2 = []
    calls3 = []
    callsNext = []
    action = { type: 'b' }
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([{ store, action, index: 0 }])
    expect(calls3).to.deep.equal([{ store, action, index: 1 }])
    expect(callsB2).to.deep.equal([{ store, action, index: 2 }])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{ action, index: 3 }])
    index = 0
    callsB1 = []
    callsB2 = []
    calls3 = []
    callsNext = []
    action = { type: 'c' }
    middleware(store)(next)(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([{ store, action, index: 0 }])
    expect(calls3).to.deep.equal([{ store, action, index: 1 }])
    expect(callsNext).to.deep.equal([{ action, index: 2 }])
  })
})
