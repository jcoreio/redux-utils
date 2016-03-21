import createReducer from '../lib/createReducer';

describe('createReducer', () => {
  it('sets initial state', () => {
    let initialState = {hello: 'world'};
    let reducer = createReducer(initialState, {});
    expect(reducer(undefined, {type: 'test'})).toEqual(initialState);
  });
  it("doesn't clobber defined state", () => {
    let initialState = {hello: 'world'};
    let reducer = createReducer(initialState, {});
    expect(reducer('state', {type: 'test'})).toEqual('state');
  });
  it("sets initialState prop of returned function", () => {
    expect(createReducer('state', {}).initialState).toBe('state');
  });
  it("sets actionHandlers prop of returned function", () => {
    let actionHandlers = {
      action1(state, action) { return state; }
    };
    expect(createReducer('state', actionHandlers).actionHandlers).toBe(actionHandlers);
  });
  it("uses single argument as actionHandlers", () => {
    let actionHandlers = {
      action1(state, action) { return state; }
    };
    let reducer = createReducer(actionHandlers);
    expect(reducer.actionHandlers).toBe(actionHandlers);
    expect(reducer.initialState).toBe(undefined);
  });
  it("returns state if no actionHandlers were provided", () => {
    let reducer = createReducer({});
    expect(reducer("can't touch this", {type: 'test'})).toBe("can't touch this");
  });
  it("applies correct action handler", () => {
    let actionHandlers = {
      action1(state, action) { 
        return Object.assign({}, state, {field1: action.payload});
      },
      action2(state, action) { 
        return Object.assign({}, state, {field2: action.payload});
      }
    };
    let reducer = createReducer({}, actionHandlers);
    let state;
    expect(reducer(state, {type: 'action1', payload: 'test1'})).toEqual({field1: 'test1'});
    expect(reducer(state, {type: 'action2', payload: 'test1'})).toEqual({field2: 'test1'});
  });
});
