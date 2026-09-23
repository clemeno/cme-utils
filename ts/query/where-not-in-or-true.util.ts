import { IS_EMPTY } from '../check/is-empty.util.js'
import type { WhereInParams } from '../where-in-params.js'
import { WHERE_NOT_IN } from './where-not-in.util.js'

/** WHERE_NOT_IN, but an empty list/set/map adds `1 = 1` like knex `whereNotIn([])`, instead of adding no condition */
export function WHERE_NOT_IN_OR_TRUE (inParams: WhereInParams): void {
  if (IS_EMPTY(inParams.values)) {
    inParams.qb.whereRaw('1 = 1')
  } else {
    WHERE_NOT_IN(inParams)
  }
}
