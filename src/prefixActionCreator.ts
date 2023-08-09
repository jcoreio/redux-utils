//@ts-nocheck
export default function prefixActionCreator(prefix: any) {
  return (actionCreator: any) =>
    (...args) => {
      const action = actionCreator(...args)
      return {
        ...action,
        type: prefix + action.type,
      }
    }
}
