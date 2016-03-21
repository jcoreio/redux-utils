export default function createMiddleware(actionHandlers) {
  let result = store => next => action => {
    let handler = actionHandlers[action.type];
    return handler ? handler(store)(next)(action) : next(action);
  };
  result.actionHandlers = actionHandlers;
  return result;
}
