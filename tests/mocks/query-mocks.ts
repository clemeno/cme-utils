/**
 * Universal Knex-style query-builder mock.
 *
 * Stubs every QB method used across the query test suite. Each call is
 * recorded in `calls` so tests can assert on method name and arguments.
 * When the first argument is a function (nested-builder callback), it is
 * invoked immediately with `qb` so the entire call graph is captured.
 */

const QB_METHODS = [
  'where',
  'orWhere',
  'whereNull',
  'whereNotNull',
  'whereNot',
  'orWhereNot',
  'whereRaw',
  'orWhereRaw',
  'orWhereNull',
  'orWhereNotNull',
] as const

export type QbMethod = (typeof QB_METHODS)[number]

export interface QbCall {
  method: QbMethod
  args: any[]
}

export function makeMockQb () {
  const calls: QbCall[] = []
  const qb: any = {}

  const buildMethod = (method: QbMethod) =>
    (...args: any[]) => {
      calls.push({ method, args })
      if (typeof args[0] === 'function') {
        args[0](qb)
      }
    }

  for (const m of QB_METHODS) {
    qb[m] = buildMethod(m)
  }

  return { qb, calls }
}
