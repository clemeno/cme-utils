import { describe, expect, it } from 'bun:test'
import { makeMockQb } from './query-mocks.js'

describe(
  'Query Mocks',
  () => {
    describe(
      'makeMockQb',
      () => {
        it(
          'should record a simple method call',
          () => {
            const { qb, calls } = makeMockQb()
            qb.where('name', '=', 'Alice')
            expect(calls).toHaveLength(1)
            expect(calls[0]).toEqual({ method: 'where', args: ['name', '=', 'Alice'] })
          }
        )

        it(
          'should record multiple method calls in order',
          () => {
            const { qb, calls } = makeMockQb()
            qb.where('a', '=', 1)
            qb.orWhere('b', '=', 2)
            qb.whereNull('c')
            expect(calls).toHaveLength(3)
            expect(calls[0].method).toBe('where')
            expect(calls[1].method).toBe('orWhere')
            expect(calls[2].method).toBe('whereNull')
          }
        )

        it(
          'should invoke a function callback with qb and still record the call',
          () => {
            const { qb, calls } = makeMockQb()
            let callbackCalledWith: any = null
            qb.where((innerQb: any) => {
              callbackCalledWith = innerQb
              innerQb.orWhere('x', '=', 1)
            })
            expect(calls[0].method).toBe('where')
            expect(callbackCalledWith).toBe(qb)
            expect(calls[1].method).toBe('orWhere')
          }
        )

        it(
          'should start with an empty calls array',
          () => {
            const { calls } = makeMockQb()
            expect(calls).toHaveLength(0)
          }
        )

        it(
          'should stub all QB methods',
          () => {
            const { qb } = makeMockQb()
            for (const m of [
              'where', 'orWhere', 'whereNull', 'whereNotNull', 'whereNot',
              'orWhereNot', 'whereRaw', 'orWhereRaw', 'orWhereNull', 'orWhereNotNull',
            ]) {
              expect(typeof qb[m]).toBe('function')
            }
          }
        )
      }
    )
  }
)
