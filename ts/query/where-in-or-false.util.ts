import { IS_EMPTY } from '../check/is-empty.util.js'
import type { WhereInParams } from '../where-in-params.js'
import { WHERE_IN } from './where-in.util.js'

/** WHERE_IN, but an empty list/set/map matches no row (`1 = 0`) instead of adding no condition */
export function WHERE_IN_OR_FALSE (inParams: WhereInParams): void {
  if (IS_EMPTY(inParams.values)) {
    inParams.qb.whereRaw('1 = 0')
  } else {
    WHERE_IN(inParams)
  }
}
