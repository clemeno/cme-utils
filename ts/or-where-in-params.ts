export interface OrWhereInParams {
  qb: any
  column: string
  values: unknown[] | Set<unknown> | Map<unknown, unknown> | readonly unknown[] | ReadonlySet<unknown> | ReadonlyMap<unknown, unknown>
}
