import { describe, expect, it } from 'bun:test'
import type { int } from '../ts/int.js'

describe(
  'int',
  () => {
    const testCases: Array<{ name: string, value: int }> = [
      { name: 'bigint zero', value: 0n },
      { name: 'positive bigint', value: 42n },
      { name: 'negative bigint', value: -7n },
      { name: 'very large bigint', value: 9007199254740993n },
      { name: 'number', value: 42 },
      { name: 'float number', value: 3.14 },
      { name: 'negative number', value: -7 },
      { name: 'zero', value: 0 },
      { name: 'numeric string', value: '123' },
      { name: 'negative numeric string', value: '-7' },
      { name: 'empty string', value: '' },
      { name: 'string "NaN"', value: 'NaN' },
    ]

    it.each(testCases)(
      '$name',
      ({ value }) => {
        const v: int = value
        expect(v).toBe(value)
      }
    )

    it(
      'accepts NaN',
      () => {
        const v: int = NaN
        expect(v).toBeNaN()
      }
    )
  }
)
