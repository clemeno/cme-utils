import { describe, expect, it } from 'bun:test'
import { makeMockQb } from './query-mocks.js'
import type { QbCall, QbMethod } from './query-mocks.js'

describe(
  'Query Mocks',
  () => {
    describe(
      'makeMockQb',
      () => {
        it.each<{ name: string, act: (inQb: any) => void, expected: QbCall[] }>([
          { name: 'should start with an empty calls array', act: () => {}, expected: [] },
          { name: 'should record a simple method call', act: inQb => { inQb.where('name', '=', 'Alice') }, expected: [{ method: 'where', args: ['name', '=', 'Alice'] }] },
          {
            name: 'should record multiple method calls in order',
            act: inQb => {
              inQb.where('a', '=', 1)
              inQb.orWhere('b', '=', 2)
              inQb.whereNull('c')
            },
            expected: [
              { method: 'where', args: ['a', '=', 1] },
              { method: 'orWhere', args: ['b', '=', 2] },
              { method: 'whereNull', args: ['c'] },
            ],
          },
        ])(
          '$name',
          ({ act, expected }) => {
            const { qb, calls } = makeMockQb()
            act(qb)
            expect(calls).toEqual(expected)
          }
        )

        it(
          'should invoke a function callback with qb and still record the call',
          () => {
            const { qb, calls } = makeMockQb()
            let callbackCalledWith: any = null
            const vCallback = (innerQb: any): void => {
              callbackCalledWith = innerQb
              innerQb.orWhere('x', '=', 1)
            }
            qb.where(vCallback)
            expect(callbackCalledWith).toBe(qb)
            expect(calls).toEqual([
              { method: 'where', args: [vCallback] },
              { method: 'orWhere', args: ['x', '=', 1] },
            ])
          }
        )

        it.each<{ name: string, method: QbMethod }>([
          { name: 'where', method: 'where' },
          { name: 'orWhere', method: 'orWhere' },
          { name: 'whereNull', method: 'whereNull' },
          { name: 'whereNotNull', method: 'whereNotNull' },
          { name: 'whereNot', method: 'whereNot' },
          { name: 'orWhereNot', method: 'orWhereNot' },
          { name: 'whereRaw', method: 'whereRaw' },
          { name: 'orWhereRaw', method: 'orWhereRaw' },
          { name: 'orWhereNull', method: 'orWhereNull' },
          { name: 'orWhereNotNull', method: 'orWhereNotNull' },
        ])(
          'should stub the QB method $name and record its call',
          ({ method }) => {
            const { qb, calls } = makeMockQb()
            qb[method]('column', '=', 1)
            expect(calls).toEqual([{ method, args: ['column', '=', 1] }])
          }
        )
      }
    )
  }
)
