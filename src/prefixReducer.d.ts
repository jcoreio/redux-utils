import { AnyAction, Reducer } from 'redux'

export default function prefixReducer(
  prefix: string
): <S = any, A extends AnyAction = AnyAction>(
  reducer: Reducer<S, A>
) => Reducer<S, A>
