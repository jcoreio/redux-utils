export default function prefixActionCreator(prefix) {
  return actionCreator => (...args) => {
    const action = actionCreator(...args)
    return {
      ...action,
      type: prefix + action.type,
    }
  }
}
