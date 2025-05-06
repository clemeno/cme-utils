export interface WhereInParams {
  qb: any
  column: any
  values: any[] | Set<any> | Map<any, any> | readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any>
}
