import { IS_EMPTY } from '../check/is-empty.util.js'
import type { OrWhereInParams } from '../or-where-in-params.js'
import { OR_WHERE_NOT_IN } from './or-where-not-in.util.js'

/** OR_WHERE_NOT_IN, but an empty list/set/map adds `OR 1 = 0` instead of adding no condition */
export function OR_WHERE_NOT_IN_OR_FALSE (inParams: OrWhereInParams): void {
  if (IS_EMPTY(inParams.values)) {
    inParams.qb.orWhereRaw('1 = 0')
  } else {
    OR_WHERE_NOT_IN(inParams)
  }
}
