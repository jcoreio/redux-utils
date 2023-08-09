//@ts-nocheck
export default function addCreationStack(fn: any, what: any) {
  const createdAt = new Error(what + ' created at:')
  return function withCause(...args) {
    try {
      return fn(...args)
    } catch (error: any) {
      if (!error.creationStack) error.creationStack = () => createdAt.stack
      throw error
    }
  }
}
