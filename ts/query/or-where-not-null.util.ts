import type { WhereNullParams } from '../where-null-params.js'

export function OR_WHERE_NOT_NULL (_: WhereNullParams): void {
  _.qb.orWhereNotNull(_.column)
}
