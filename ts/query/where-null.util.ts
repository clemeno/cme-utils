import type { WhereNullParams } from '../where-null-params.js'

export const WHERE_NULL = (_: WhereNullParams): void => { _.qb.whereNull(_.column) }
