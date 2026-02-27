import type { WhereNullParams } from '../where-null-params.js'

export function OR_WHERE_NULL (_: WhereNullParams): void {
  _.qb.orWhereNull(_.column)
}
