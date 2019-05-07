export default function fullStack(error, wrapped = error => error.stack) {
  let result = wrapped(error)
  if (error.creationStack)
    result += '\nCaused by ' + error.creationStack().substring('Error: '.length)
  return result
}
