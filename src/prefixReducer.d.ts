import { Reducer } from 'redux'

export default function prefixReducer(
  prefix: string
): <S>(reducer: Reducer<S>) => Reducer<S>
