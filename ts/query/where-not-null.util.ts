import type { WhereNullParams } from '../where-null-params.js'

export function WHERE_NOT_NULL (_: WhereNullParams): void {
  _.qb.whereNotNull(_.column)
}
