import {expect} from 'chai'
import prefixActionCreator from '../src/prefixActionCreator'

describe('prefixActionCreator', () => {
  it('works', () => {
    function setEntry(key, value) {
      return {
        type: 'SET_ENTRY',
        payload: value,
        meta: {key}
      }
    }

    expect(prefixActionCreator('TEST.')(setEntry)('hello', 'world')).to.deep.equal({
      type: 'TEST.SET_ENTRY',
      payload: 'world',
      meta: {key: 'hello'}
    })
  })
})


