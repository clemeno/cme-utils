import { describe, expect, it } from 'bun:test'
import { BIG_ADD_10 } from '../../ts/convert/big-add-10.util.js'

describe(
  'BIG_ADD_10',
  () => {
    const testCases = [
      { name: '0 + 0', x: '0', y: '0', expected: '0' },
      { name: '1 + 1', x: '1', y: '1', expected: '2' },
      { name: '9 + 1 (carry)', x: '9', y: '1', expected: '10' },
      { name: '99 + 1', x: '99', y: '1', expected: '100' },
      { name: '123 + 456', x: '123', y: '456', expected: '579' },
      { name: '999 + 1 (multi-carry)', x: '999', y: '1', expected: '1000' },
      { name: 'large addition', x: '999999999999999999', y: '1', expected: '1000000000000000000' },
      { name: 'numeric inputs', x: 10, y: 20, expected: '30' },
      { name: '0 + 1', x: '0', y: '1', expected: '1' },
      { name: '50 + 50', x: '50', y: '50', expected: '100' },
    ]

    it.each(testCases)(
      '$name',
      ({ x, y, expected }) => {
        expect(BIG_ADD_10({ x, y })).toBe(expected)
      }
    )
  }
)
