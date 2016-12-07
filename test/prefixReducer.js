import {expect} from 'chai'
import createReducer from '../src/createReducer'
import prefixReducer from '../src/prefixReducer'

describe('prefixReducer', () => {
  it('works for basic reducer', () => {
    const reducer = (state, action) => action.type === 'INCREMENT' ? state + 1 : state
    const reducer2 = prefixReducer('TEST.')(reducer)
    expect(reducer2(1, {type: 'INCREMENT'})).to.equal(1)
    expect(reducer2(1, {type: 'TEST.INCREMENT'})).to.equal(2)
    expect(reducer2(1, {type: 'BLAH.INCREMENT'})).to.equal(1)
  })
  it('works for action map reducer', () => {
    const reducer = createReducer(0, {
      INCREMENT: state => state + 1,
      DECREMENT: state => state - 1,
    })
    const reducer2 = prefixReducer('TEST.')(reducer)
    expect(reducer2.initialState).to.equal(0)
    expect(reducer2.actionHandlers['TEST.INCREMENT']).to.be.an.instanceof(Function)
    expect(reducer2.actionHandlers['TEST.DECREMENT']).to.be.an.instanceof(Function)
    expect(reducer2(1, {type: 'INCREMENT'})).to.equal(1)
    expect(reducer2(1, {type: 'TEST.INCREMENT'})).to.equal(2)
    expect(reducer2(1, {type: 'BLAH.INCREMENT'})).to.equal(1)
    expect(reducer2(1, {type: 'DECREMENT'})).to.equal(1)
    expect(reducer2(1, {type: 'TEST.DECREMENT'})).to.equal(0)
    expect(reducer2(1, {type: 'BLAH.DECREMENT'})).to.equal(1)
  })
})


