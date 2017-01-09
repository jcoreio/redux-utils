import {expect} from 'chai'
import addMeta from '../src/addMeta'

describe('addMeta', () => {
  it('adds meta to created actions', () => {
    function setEntry(key, value) {
      return {
        type: 'SET_ENTRY',
        payload: value,
        meta: {key}
      }
    }

    const setEntry2 = addMeta({domain: 'config'})(setEntry)
    expect(setEntry2('hello', 'world')).to.deep.equal({
      type: 'SET_ENTRY',
      payload: 'world',
      meta: {key: 'hello', domain: 'config'},
    })

    const setEntry3 = addMeta({key: 'blah', domain: 'config'})(setEntry)
    expect(setEntry3('hello', 'world')).to.deep.equal({
      type: 'SET_ENTRY',
      payload: 'world',
      meta: {key: 'blah', domain: 'config'},
    })
  })
  it('works if the original action has no meta', () => {
    function setValue(value) {
      return {
        type: 'SET_VALUE',
        payload: value,
      }
    }

    const setValue2 = addMeta({domain: 'config'})(setValue)
    expect(setValue2('hello')).to.deep.equal({
      type: 'SET_VALUE',
      payload: 'hello',
      meta: {domain: 'config'},
    })
  })
  it('works directly on actions instead of action creators', () => {
    function setEntry(key, value) {
      return {
        type: 'SET_ENTRY',
        payload: value,
        meta: {key}
      }
    }

    expect(addMeta({domain: 'config'})(setEntry('hello', 'world'))).to.deep.equal({
      type: 'SET_ENTRY',
      payload: 'world',
      meta: {key: 'hello', domain: 'config'},
    })

    expect(addMeta({key: 'blah', domain: 'config'})(setEntry('hello', 'world'))).to.deep.equal({
      type: 'SET_ENTRY',
      payload: 'world',
      meta: {key: 'blah', domain: 'config'},
    })
  })
})

