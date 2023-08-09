//@ts-nocheck
import { expect } from 'chai'
import createReducer from '../src/createReducer'
describe('createReducer', () => {
  it('sets initial state', () => {
    const initialState = { hello: 'world' }
    const reducer = createReducer(initialState, {})
    expect(reducer(undefined, { type: 'test' })).to.deep.equal(initialState)
  })
  it("doesn't clobber defined state", () => {
    const initialState = { hello: 'world' }
    const reducer = createReducer(initialState, {})
    expect(reducer('state', { type: 'test' })).to.deep.equal('state')
  })
  it('sets initialState prop of returned function', () => {
    expect(createReducer('state', {}).initialState).to.equal('state')
  })
  it('sets actionHandlers prop of returned function', () => {
    const actionHandlers = {
      action1(state: any, action: any) {
        return state
      },
    }
    expect(createReducer('state', actionHandlers).actionHandlers).to.equal(
      actionHandlers
    )
  })
  it('uses single argument as actionHandlers', () => {
    const actionHandlers = {
      action1(state: any, action: any) {
        return state
      },
    }
    const reducer = createReducer(actionHandlers)
    expect(reducer.actionHandlers).to.equal(actionHandlers)
    expect(reducer.initialState).to.equal(undefined)
  })
  it('returns state if no actionHandlers were provided', () => {
    const reducer = createReducer({})
    expect(reducer("can't touch this", { type: 'test' })).to.equal(
      "can't touch this"
    )
  })
  it('applies correct action handler', () => {
    const actionHandlers = {
      action1(state: any, action: any) {
        return Object.assign({}, state, { field1: action.payload })
      },

      action2(state: any, action: any) {
        return Object.assign({}, state, { field2: action.payload })
      },
    }
    const reducer = createReducer({}, actionHandlers)
    let state
    expect(reducer(state, { type: 'action1', payload: 'test1' })).to.deep.equal(
      { field1: 'test1' }
    )
    expect(reducer(state, { type: 'action2', payload: 'test1' })).to.deep.equal(
      { field2: 'test1' }
    )
  })
})
