import {expect} from 'chai'
import createPluggableMiddleware from '../src/createPluggableMiddleware'
import sinon from 'sinon'

describe('createPluggableMiddleware', () => {
  it("uses argument as initial middleware", () => {
    let store = {
      dispatch(action) {}
    }
    sinon.spy(store, 'dispatch')
    let middleware = createPluggableMiddleware(store => next => action => store.dispatch({type: 'test'}))
    middleware(store)(() => {})({type: 'ignored'})
    expect(store.dispatch.args).to.deep.equal([[{type: 'test'}]])
  })
  it("uses new middleware provided to replaceMiddleware", () => {
    let store = {
      dispatch(action) {}
    }
    sinon.spy(store, 'dispatch')
    let middleware = createPluggableMiddleware(store => next => action => store.dispatch({type: 'test'}))
    middleware.replaceMiddleware(store => next => action => store.dispatch({type: 'test2'}))
    middleware(store)(() => {})({type: 'ignored'})
    expect(store.dispatch.args).to.deep.equal([[{type: 'test2'}]])
  })
  it("calls next(action) when middleware is null/undefined", () => {
    let middleware = createPluggableMiddleware()
    let store = {
      dispatch(action) {}
    }
    let next = sinon.spy()
    middleware(store)(next)({type: 'action'})
    expect(next.args).to.deep.equal([[{type: 'action'}]])
  })
})
