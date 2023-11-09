export default function addCreationStack(fn, what) {
  const createdAt = new Error(what + ' created at:')
  return Object.assign(function withCause(...args) {
    try {
      return fn(...args)
    } catch (error) {
      if (!error.creationStack) error.creationStack = () => createdAt.stack
      throw error
    }
  }, fn)
}
