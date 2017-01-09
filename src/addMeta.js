export default function addMeta(meta) {
  function addMetaToAction(action) {
    return {
    ...action,
      meta: {
    ...action.meta,
    ...meta,
    }
    }
  }
  return actionOrCreator => actionOrCreator instanceof Function
    ? (...args) => addMetaToAction(actionOrCreator(...args))
    : addMetaToAction(actionOrCreator)
}

