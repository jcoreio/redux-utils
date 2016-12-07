import {expect} from 'chai'
import prefixReducer from '../src/prefixReducer'

describe('prefixReducer', () => {
  const reducer = (state, action) => action.type === 'INCREMENT' ? state + 1 : state

  it('works', () => {
    const reducer2 = prefixReducer('TEST.')(reducer)
    expect(reducer2(1, {type: 'INCREMENT'})).to.equal(1)
    expect(reducer2(1, {type: 'TEST.INCREMENT'})).to.equal(2)
    expect(reducer2(1, {type: 'BLAH.INCREMENT'})).to.equal(1)
  })
})


