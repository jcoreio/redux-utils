//@ts-nocheck
import { expect } from 'chai'
import { createStore } from 'redux'
import createMiddleware from '../src/createMiddleware'
import applyMiddleware from '../src/applyMiddleware'
describe('applyMiddleware', () => {
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
      callsA1.push({ action, index: index++ }) && next(action)

    const middlewareA2 = (store: any) => (next: any) => (action: any) =>
      callsA2.push({ action, index: index++ }) && next(action)

    const middlewareA3 = (store: any) => (next: any) => (action: any) =>
      callsA3.push({ action, index: index++ }) && next(action)

    const middlewareB1 = (store: any) => (next: any) => (action: any) =>
      callsB1.push({ action, index: index++ }) && next(action)

    const middlewareB2 = (store: any) => (next: any) => (action: any) =>
      callsB2.push({ action, index: index++ }) && next(action)

    const middlewareC1 = (store: any) => (next: any) => (action: any) =>
      callsC1.push({ action, index: index++ }) && next(action)

    const middleware1 = createMiddleware({
      a: middlewareA1,
    })
    const middleware2 = createMiddleware({
      a: middlewareA3,
      b: middlewareB1,
      c: middlewareC1,
    })

    const middleware3 = (store: any) => (next: any) => (action: any) =>
      calls3.push({ action, index: index++ }) && next(action)

    const middleware4 = createMiddleware({
      a: middlewareA2,
      b: middlewareB2,
    })
    let callsNext: any = []
    const store = createStore(
      (state, action) => {
        callsNext.push({ action, index: index++ })
        return state
      },
      {},
      applyMiddleware(middleware1, middleware2, middleware3, middleware4)
    ) // reset index since createStore dispatched a dummy action

    index = 0
    callsNext = []
    let action = { type: 'a' }
    store.dispatch(action)
    expect(callsA1).to.deep.equal([{ action, index: 0 }])
    expect(callsA3).to.deep.equal([{ action, index: 1 }])
    expect(calls3).to.deep.equal([{ action, index: 2 }])
    expect(callsA2).to.deep.equal([{ action, index: 3 }])
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
    store.dispatch(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([{ action, index: 0 }])
    expect(calls3).to.deep.equal([{ action, index: 1 }])
    expect(callsB2).to.deep.equal([{ action, index: 2 }])
    expect(callsC1).to.deep.equal([])
    expect(callsNext).to.deep.equal([{ action, index: 3 }])
    index = 0
    callsB1 = []
    callsB2 = []
    calls3 = []
    callsNext = []
    action = { type: 'c' }
    store.dispatch(action)
    expect(callsA1).to.deep.equal([])
    expect(callsA2).to.deep.equal([])
    expect(callsB1).to.deep.equal([])
    expect(callsB2).to.deep.equal([])
    expect(callsC1).to.deep.equal([{ action, index: 0 }])
    expect(calls3).to.deep.equal([{ action, index: 1 }])
    expect(callsNext).to.deep.equal([{ action, index: 2 }])
  })
})
