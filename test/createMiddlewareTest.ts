//@ts-nocheck
import { expect } from 'chai'
import createMiddleware from '../src/createMiddleware'
import sinon from 'sinon'
describe('createMiddleware', () => {
  it('calls next(action) if no actionHandlers are provided', () => {
    const store = {
      dispatch() {},
    }
    const middleware = createMiddleware({})
    const next = sinon.spy()
    middleware(store)(next)({ type: 'action' })
    expect(next.args).to.deep.equal([[{ type: 'action' }]])
  })
  it('returns a function with an actionHandlers property', () => {
    const middlewareA = (store: any) => (next: any) => (action: any) =>
      next(action)

    const middlewareB = (store: any) => (next: any) => (action: any) =>
      next(action)

    const actionHandlers = {
      a: middlewareA,
      b: middlewareB,
    }
    const middleware = createMiddleware(actionHandlers)
    expect(middleware.actionHandlers).to.equal(actionHandlers)
    expect(middleware instanceof Function).to.be.true
  })
  it('calls the correct middleware', () => {
    let callsA: any = []
    let callsB: any = []

    const middlewareA = (store: any) => (next: any) => (action: any) =>
      callsA.push({ store, next, action }) && next(action)

    const middlewareB = (store: any) => (next: any) => (action: any) =>
      callsB.push({ store, next, action }) && next(action)

    const middleware = createMiddleware({
      a: middlewareA,
      b: middlewareB,
    })
    const store = { store: true }
    let callsNext: any = []

    const next = (action: any) => callsNext.push({ action })

    let action = { type: 'a' }
    middleware(store)(next)(action)
    expect(callsA).to.deep.equal([{ store, next, action }])
    expect(callsB).to.deep.equal([])
    expect(callsNext).to.deep.equal([{ action }])
    callsA = []
    callsB = []
    callsNext = []
    action = { type: 'b' }
    middleware(store)(next)(action)
    expect(callsA).to.deep.equal([])
    expect(callsB).to.deep.equal([{ store, next, action }])
    expect(callsNext).to.deep.equal([{ action }])
  })
})
