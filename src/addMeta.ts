//@ts-nocheck
export default function addMeta(meta: any) {
  function addMetaToAction(action: any) {
    return {
      ...action,
      meta: {
        ...action.meta,
        ...meta,
      },
    }
  }

  return (actionOrCreator: any) =>
    actionOrCreator instanceof Function
      ? (...args) => addMetaToAction(actionOrCreator(...args))
      : addMetaToAction(actionOrCreator)
}
