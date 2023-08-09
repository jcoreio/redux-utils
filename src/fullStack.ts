//@ts-nocheck
export default function fullStack(
  error: any,
  wrapped = (error: any) => error.stack
) {
  let result = wrapped(error)
  if (error.creationStack)
    result += '\nCaused by ' + error.creationStack().substring('Error: '.length)
  return result
}
