import { ActionCreator } from 'redux'

export default function prefixActionCreator(
  prefix: string
): <A>(actionCreator: ActionCreator<A>) => ActionCreator<A>
