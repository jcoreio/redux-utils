//@ts-nocheck
import { expect } from 'chai'
import createPluggableMiddleware from '../src/createPluggableMiddleware'
import sinon from 'sinon'
describe('createPluggableMiddleware', () => {
  it('uses argument as initial middleware', () => {
    const store = {
      dispatch(action: any) {},
    }
    sinon.spy(store, 'dispatch')
    const middleware = createPluggableMiddleware(
      (store) => (next: any) => (action: any) =>
        store.dispatch({ type: 'test' })
    )
    middleware(store)(() => {})({ type: 'ignored' })
    expect(store.dispatch.args).to.deep.equal([[{ type: 'test' }]])
  })
  it('uses new middleware provided to replaceMiddleware', () => {
    const store = {
      dispatch(action: any) {},
    }
    sinon.spy(store, 'dispatch')
    const middleware = createPluggableMiddleware(
      (store) => (next: any) => (action: any) =>
        store.dispatch({ type: 'test' })
    )
    middleware.replaceMiddleware(
      (store) => (next: any) => (action: any) =>
        store.dispatch({ type: 'test2' })
    )
    middleware(store)(() => {})({ type: 'ignored' })
    expect(store.dispatch.args).to.deep.equal([[{ type: 'test2' }]])
  })
  it('calls next(action) when middleware is null/undefined', () => {
    const middleware = createPluggableMiddleware()
    const store = {
      dispatch(action: any) {},
    }
    const next = sinon.spy()
    middleware(store)(next)({ type: 'action' })
    expect(next.args).to.deep.equal([[{ type: 'action' }]])
  })
})
