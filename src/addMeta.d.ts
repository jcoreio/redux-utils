import { AnyAction } from 'redux'

export default function addMeta<M extends object>(
  meta: M
): <A extends AnyAction>(action: A) => A & { meta: M }
