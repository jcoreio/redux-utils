//@ts-nocheck
import { expect } from 'chai'
import createReducer from '../src/createReducer'
import composeReducers from '../src/composeReducers'
describe('composeReducers', () => {
  it('returns identity function if no reducers are given', () => {
    expect(composeReducers()('wat')).to.equal('wat')
  })
  it('returns a reducer that applies all arguments', () => {
    const reducer = composeReducers(
      (state = {}, action) =>
        Object.assign({}, state, { field0: action.payload }),
      createReducer({
        action1(state: any, action: any) {
          return Object.assign({}, state, { field1: action.payload })
        },
      })
    )
    expect(reducer.actionHandlers).to.equal(undefined)
    expect(reducer.initialState).to.equal(undefined)
    expect(
      reducer(undefined, { type: 'action0', payload: 'test' })
    ).to.deep.equal({ field0: 'test' })
    expect(
      reducer(undefined, { type: 'action1', payload: 'test2' })
    ).to.deep.equal({ field0: 'test2', field1: 'test2' })
  })
  it('returns a reducer from createReducer if all arguments have actionHandlers', () => {
    const reducer = composeReducers(
      createReducer(
        {},
        {
          action1(state: any, action: any) {
            return Object.assign({}, state, { field1: action.payload })
          },
        }
      ),
      createReducer(
        { will: 'get stomped' },
        {
          action2(state: any, action: any) {
            return Object.assign({}, state, { field2: action.payload })
          },
        }
      )
    )
    expect(reducer.actionHandlers).to.exist
    expect(reducer.initialState).to.deep.equal({})
    expect(
      reducer(undefined, { type: 'action1', payload: 'test' })
    ).to.deep.equal({ field1: 'test' })
    expect(
      reducer(undefined, { type: 'action2', payload: 'test' })
    ).to.deep.equal({ field2: 'test' })
  })
  it('composes actionHandlers for the same action type', () => {
    const reducer = composeReducers(
      createReducer(0, {
        action1(state: any) {
          return state + 1
        },

        action2(state: any) {
          return state * 5
        },
      }),
      createReducer(0, {
        action1(state: any) {
          return state * 2
        },

        action2(state: any) {
          return state - 3
        },
      })
    )
    expect(reducer(4, { type: 'action1' })).to.equal(10)
    expect(reducer(4, { type: 'action1' })).to.equal(
      reducer.actionHandlers.action1(4)
    )
    expect(reducer(3, { type: 'action2' })).to.equal(12)
    expect(reducer(3, { type: 'action2' })).to.equal(
      reducer.actionHandlers.action2(3)
    )
  })
  it('handles interleaved reducers with and without actionHandlers', () => {
    const reducer = composeReducers(
      createReducer(0, {
        action1(state: any) {
          return state + 1
        },

        action2(state: any) {
          return state * 5
        },
      }),
      createReducer(0, {
        action1(state: any) {
          return state * 2
        },

        action2(state: any) {
          return state - 3
        },
      }),
      (state) => state + 0.5,
      createReducer(0, {
        action1(state: any) {
          return state * 3
        },

        action2(state: any) {
          return state - 2
        },
      }),
      createReducer(0, {
        action1(state: any) {
          return state * 4
        },

        action2(state: any) {
          return state - 4
        },
      })
    )
    expect(reducer(4, { type: 'action1' })).to.equal(31.5 * 4)
    expect(reducer(3, { type: 'action2' })).to.equal(6.5)
  })
})
