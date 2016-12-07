export default function prefixReducerActionTypes(prefix) {
  return reducer => (state, action) => action.type.startsWith(prefix)
    ? reducer(state, {...action, type: action.type.substring(prefix.length)})
    : state
}

