export default function addMeta(meta) {
  return actionCreator => (...args) => {
    const action = actionCreator(...args)
    return {
      ...action,
      meta: {
        ...action.meta,
        ...meta
      }
    }
  }
}

