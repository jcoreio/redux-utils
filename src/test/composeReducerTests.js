import createReducer from '../lib/createReducer';
import composeReducers from '../lib/composeReducers';

describe('composeReducers', () => {
  it("returns a reducer that applies all arguments if any are missing actionHandlers", () => {
    let reducer = composeReducers(
      (state = {}, action) => Object.assign({}, state, {field0: action.payload}),
      createReducer({
        action1(state, action) { return Object.assign({}, state, {field1: action.payload})}
      })
    );
    expect(reducer.actionHandlers).toBe(undefined);
    expect(reducer.initialState).toBe(undefined);
    expect(reducer(undefined, {type: 'action0', payload: 'test'})).toEqual({field0: 'test'});
    expect(reducer(undefined, {type: 'action1', payload: 'test2'})).toEqual({field0: 'test2', field1: 'test2'});
  });
  it("returns a reducer from createReducer if all arguments have actionHandlers", () => {
    let reducer = composeReducers(
      createReducer({}, {
        action1(state, action) { return Object.assign({}, state, {field1: action.payload})}
      }),
      createReducer({will: 'get stomped'}, {
        action2(state, action) { return Object.assign({}, state, {field2: action.payload})}
      })
    );
    expect(reducer.actionHandlers).toBeDefined();
    expect(reducer.initialState).toEqual({});
    expect(reducer(undefined, {type: 'action1', payload: 'test'})).toEqual({field1: 'test'});
    expect(reducer(undefined, {type: 'action2', payload: 'test'})).toEqual({field2: 'test'});
  });
  it("composes actionHandlers for the same action type", () => {
    let reducer = composeReducers(
      createReducer(0, {
        action1(state) { return state + 1 },
        action2(state) { return state * 5 }
      }),
      createReducer(0, {
        action1(state) { return state * 2 },
        action2(state) { return state - 3 }
      })
    );
    expect(reducer(4, {type: 'action1'})).toBe(10);
    expect(reducer(4, {type: 'action1'})).toBe(reducer.actionHandlers.action1(4));
    expect(reducer(3, {type: 'action2'})).toBe(12);
    expect(reducer(3, {type: 'action2'})).toBe(reducer.actionHandlers.action2(3));
  });
});
