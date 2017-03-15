import {expect} from 'chai'
import sinon from 'sinon'
import createReducer from '../src/createReducer'
import composeReducers from '../src/composeReducers'
import createMiddleware from '../src/createMiddleware'
import composeMiddleware from '../src/composeMiddleware'
import createPluggableMiddleware from '../src/createPluggableMiddleware'

/* eslint-disable no-console */
/* eslint-env node */

describe('dev mode warnings', () => {
  let origNodeEnv
  before(() => {
    origNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = ''
  })
  after(() => process.env.NODE_ENV = origNodeEnv)
  beforeEach(() => {
    sinon.spy(console, 'error')
  })
  afterEach(() => {
    console.error.restore()
  })
  describe('createReducer', () => {
    it('warns if any actionHandlers are not functions', () => {
      createReducer({hello: 'world'})
      expect(console.error.called).to.be.true
    })
    it("doesn't warn if all actionHandlers are functions", () => {
      createReducer({hello: () => 'world'})
      expect(console.error.called).to.be.false
    })
  })
  describe('composeReducers', () => {
    it('warns if any reducers are not functions', () => {
      try {
        composeReducers(() => {}, 'hello')
      } catch (error) {
        // ignore
      }
      expect(console.error.called).to.be.true
    })
    it("doesn't warn if all actionHandlers are functions", () => {
      composeReducers(() => {})
      expect(console.error.called).to.be.false
    })
  })
  describe('createMiddleware', () => {
    it('warns if any actionHandlers are not functions', () => {
      createMiddleware({hello: 'world'})
      expect(console.error.called).to.be.true
    })
    it("doesn't warn if all actionHandlers are functions", () => {
      createMiddleware({hello: () => 'world'})
      expect(console.error.called).to.be.false
    })
  })
  describe('composeMiddleware', () => {
    it('warns if any reducers are not functions', () => {
      composeMiddleware(() => {}, 'hello')
      expect(console.error.called).to.be.true
    })
    it("doesn't warn if all actionHandlers are functions", () => {
      composeMiddleware(() => {})
      expect(console.error.called).to.be.false
    })
  })
  describe('createPluggableMiddleware', () => {
    it('warns if any reducers are not functions', () => {
      const middleware = createPluggableMiddleware('hello')
      expect(console.error.called).to.be.true
      console.error.reset()
      middleware.replaceMiddleware('world')
      expect(console.error.called).to.be.true
    })
    it("doesn't warn if all actionHandlers are functions", () => {
      const middleware = createPluggableMiddleware(() => {})
      expect(console.error.called).to.be.false
      middleware.replaceMiddleware(() => () => () => 'world')
      expect(console.error.called).to.be.false
    })
  })
})
