import {reduce, every, forEach, mapValues, identity, compact} from 'lodash';
import createReducer from './createReducer';

export default function composeReducers(...reducers) {
  reducers = compact(reducers);

  if (reducers.length === 0) return identity;
  if (reducers.length === 1) return reducers[0];

  // if all reducers have actionHandlers maps, merge the maps using composeReducers
  if (every(reducers, reducer => reducer.actionHandlers instanceof Object)) {
    let actionHandlers = {};
    let initialState;
    reducers.forEach(reducer => {
      if (initialState === undefined) initialState = reducer.initialState;
      forEach(reducer.actionHandlers, (actionHandler, type) => {
        (actionHandlers[type] || (actionHandlers[type] = [])).push(actionHandler);
      });
    });
    return createReducer(initialState, mapValues(actionHandlers, 
      typeHandlers => composeReducers(...typeHandlers)));
  }

  return (state, action) => reduce(reducers, (state, reducer) => reducer(state, action), state);
}
