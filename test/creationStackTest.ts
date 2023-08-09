//@ts-nocheck
import { assert, expect } from 'chai'
import {
  createReducer,
  composeReducers,
  createMiddleware,
  composeMiddleware,
  prefixReducer,
  fullStack,
} from '../src'
describe('addCreationStack', () => {
  let origNodeEnv
  before(() => {
    origNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = ''
  })
  after(() => (process.env.NODE_ENV = origNodeEnv))
  describe('createReducer', () => {
    it('adds creation stack to errors', () => {
      const r = createReducer({
        hello: () => {
          throw new Error('test')
        },
      })

      try {
        r({}, { type: 'hello' })
        assert.fail('expected error to be thrown')
      } catch (error: any) {
        expect(fullStack(error)).to.match(/caused by reducer created at/i)
      }
    })
  })
  describe('composeReducers', () => {
    it('adds creation stack to errors', () => {
      const r = composeReducers(() => {
        throw new Error('test')
      })

      try {
        r({}, { type: 'hello' })
        assert.fail('expected error to be thrown')
      } catch (error: any) {
        expect(fullStack(error)).to.match(/caused by reducer created at/i)
      }
    })
  })
  describe('createMiddleware', () => {
    it('adds creation stack to errors', () => {
      const r = createMiddleware({
        hello: (store) => (next: any) => (action: any) => {
          throw new Error('test')
        },
      })

      try {
        r(null)(null)({ type: 'hello' })
        assert.fail('expected error to be thrown')
      } catch (error: any) {
        expect(fullStack(error)).to.match(/caused by middleware created at/i)
      }
    })
  })
  describe('composeMiddleware', () => {
    it('adds creation stack to errors', () => {
      const r = composeMiddleware(
        (store) => (dispatch: any) => dispatch,
        (store) => (next: any) => (action: any) => {
          throw new Error('test')
        }
      )

      try {
        r(null)(null)({ type: 'hello' })
        assert.fail('expected error to be thrown')
      } catch (error: any) {
        expect(fullStack(error)).to.match(/caused by middleware created at/i)
      }
    })
  })
  describe('prefixReducer', () => {
    it('adds creation stack to errors', () => {
      const r = prefixReducer('hello')(() => {
        throw new Error('test')
      })

      try {
        r({}, { type: 'hello' })
        assert.fail('expected error to be thrown')
      } catch (error: any) {
        expect(fullStack(error)).to.match(/caused by reducer created at/i)
      }
    })
  })
})
