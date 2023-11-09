import { Dispatch, Middleware } from 'redux'

export function combineMiddlewareWithActionHandlers<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  ...middlewares: Middleware<DispatchExt, S, D>[]
): Middleware<DispatchExt, S, D>

export default function composeMiddleware<
  Ext1 = {},
  S = any,
  D extends Dispatch = Dispatch
>(middleware1: Middleware<Ext1, S, D>): Middleware<Ext1, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>
): Middleware<Ext1 & Ext2, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  Ext3 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>,
  middleware3: Middleware<Ext3, S, D>
): Middleware<Ext1 & Ext2 & Ext3, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  Ext3 = {},
  Ext4 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>,
  middleware3: Middleware<Ext3, S, D>,
  middleware4: Middleware<Ext4, S, D>
): Middleware<Ext1 & Ext2 & Ext3 & Ext4, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  Ext3 = {},
  Ext4 = {},
  Ext5 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>,
  middleware3: Middleware<Ext3, S, D>,
  middleware4: Middleware<Ext4, S, D>,
  middleware5: Middleware<Ext5, S, D>
): Middleware<Ext1 & Ext2 & Ext3 & Ext4 & Ext5, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  Ext3 = {},
  Ext4 = {},
  Ext5 = {},
  Ext6 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>,
  middleware3: Middleware<Ext3, S, D>,
  middleware4: Middleware<Ext4, S, D>,
  middleware5: Middleware<Ext5, S, D>,
  middleware6: Middleware<Ext6, S, D>
): Middleware<Ext1 & Ext2 & Ext3 & Ext4 & Ext5 & Ext6, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  Ext3 = {},
  Ext4 = {},
  Ext5 = {},
  Ext6 = {},
  Ext7 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>,
  middleware3: Middleware<Ext3, S, D>,
  middleware4: Middleware<Ext4, S, D>,
  middleware5: Middleware<Ext5, S, D>,
  middleware6: Middleware<Ext6, S, D>,
  middleware7: Middleware<Ext7, S, D>
): Middleware<Ext1 & Ext2 & Ext3 & Ext4 & Ext5 & Ext6 & Ext7, S, D>
export default function composeMiddleware<
  Ext1 = {},
  Ext2 = {},
  Ext3 = {},
  Ext4 = {},
  Ext5 = {},
  Ext6 = {},
  Ext7 = {},
  Ext8 = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  middleware1: Middleware<Ext1, S, D>,
  middleware2: Middleware<Ext2, S, D>,
  middleware3: Middleware<Ext3, S, D>,
  middleware4: Middleware<Ext4, S, D>,
  middleware5: Middleware<Ext5, S, D>,
  middleware6: Middleware<Ext6, S, D>,
  middleware7: Middleware<Ext7, S, D>,
  middleware8: Middleware<Ext8, S, D>
): Middleware<Ext1 & Ext2 & Ext3 & Ext4 & Ext5 & Ext6 & Ext7 & Ext8, S, D>
export default function composeMiddleware<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
>(
  ...middlewares: Middleware<DispatchExt, S, D>[]
): Middleware<DispatchExt, S, D>
