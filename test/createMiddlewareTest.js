import { expect } from 'chai'
import createMiddleware from '../src/createMiddleware'
import sinon from 'sinon'

describe('createMiddleware', () => {
  it('calls next(action) if no actionHandlers are provided', () => {
    let store = {
      dispatch() {},
    }
    let middleware = createMiddleware({})
    let next = sinon.spy()
    middleware(store)(next)({ type: 'action' })
    expect(next.args).to.deep.equal([[{ type: 'action' }]])
  })
  it('returns a function with an actionHandlers property', () => {
    let middlewareA = (store) => (next) => (action) => next(action)
    let middlewareB = (store) => (next) => (action) => next(action)
    let actionHandlers = {
      a: middlewareA,
      b: middlewareB,
    }
    let middleware = createMiddleware(actionHandlers)
    expect(middleware.actionHandlers).to.equal(actionHandlers)
    expect(middleware instanceof Function).to.be.true
  })
  it('calls the correct middleware', () => {
    let callsA = []
    let callsB = []
    let middlewareA = (store) => (next) => (action) =>
      callsA.push({ store, next, action }) && next(action)
    let middlewareB = (store) => (next) => (action) =>
      callsB.push({ store, next, action }) && next(action)
    let middleware = createMiddleware({
      a: middlewareA,
      b: middlewareB,
    })

    let store = { store: true }
    let callsNext = []
    let next = (action) => callsNext.push({ action })

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
