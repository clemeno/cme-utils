import { describe, expect, it } from 'bun:test'
import type { getRandomValuesFnType } from '../../ts/get-random-values-fn-type.js'
import { GET_RANDOM_INT_BETWEEN } from '../../ts/number/get-random-int-between.util.js'

describe(
  'GET_RANDOM_INT_BETWEEN',
  () => {
    const kIterations = 100 // draws per case, to exercise the randomness

    it.each<{ name: string, input: Parameters<typeof GET_RANDOM_INT_BETWEEN>[0], min: number, max: number }>([
      { name: 'return an integer between min and max (inclusive)', input: { a: 5, b: 10 }, min: 5, max: 10 },
      { name: 'work when a > b', input: { a: 10, b: 5 }, min: 5, max: 10 },
      { name: 'handle decimal inputs by truncating them', input: { a: 5.7, b: 10.9 }, min: 5, max: 10 },
      { name: 'handle negative numbers', input: { a: -10, b: -5 }, min: -10, max: -5 },
      { name: 'return a number', input: { a: 1, b: 10 }, min: 1, max: 10 },
    ])(
      'should $name',
      ({ input, min, max }) => {
        const vResultList = Array.from({ length: kIterations }, () => GET_RANDOM_INT_BETWEEN(input))
        expect(vResultList.every(Number.isInteger)).toBe(true)
        expect(Math.min(...vResultList)).toBeGreaterThanOrEqual(min)
        expect(Math.max(...vResultList)).toBeLessThanOrEqual(max)
      }
    )

    it.each<{ name: string, input: Parameters<typeof GET_RANDOM_INT_BETWEEN>[0], expected: number }>([
      { name: 'handle same values', input: { a: 5, b: 5 }, expected: 5 },
      { name: 'handle zero range', input: { a: 0, b: 0 }, expected: 0 },
    ])(
      'should $name',
      ({ input, expected }) => {
        expect(GET_RANDOM_INT_BETWEEN(input)).toBe(expected)
      }
    )

    it.each<{ name: string, input: Parameters<typeof GET_RANDOM_INT_BETWEEN>[0] }>([
      { name: 'a NaN bound', input: { a: Number.NaN, b: 5 } },
      { name: 'an infinite bound', input: { a: 0, b: Number.POSITIVE_INFINITY } },
    ])(
      'should return NaN for $name',
      ({ input }) => {
        expect(GET_RANDOM_INT_BETWEEN(input)).toBeNaN()
      }
    )

    describe(
      'draws from the injected getRandomValues',
      () => {
        /** Returns a getRandomValues whose calls get the byte lists of `drawList`, in order. */
        function getRandomValuesFrom (drawList: number[][]): getRandomValuesFnType {
          const queue = [...drawList]
          return array => { array.set(queue.shift() ?? []); return array }
        }

        it.each<{ name: string, a: number, b: number, drawList: number[][], expected: number }>([
          { name: 'lowest draw → min', a: 5, b: 10, drawList: [[0]], expected: 5 },
          { name: 'highest kept draw → max (upper bound included)', a: 5, b: 10, drawList: [[5]], expected: 10 },
          { name: 'highest kept draw with a > b → max', a: 10, b: 5, drawList: [[5]], expected: 10 },
          { name: 'highest kept draw on negatives → max', a: -10, b: -5, drawList: [[5]], expected: -5 },
          { name: 'the bits above the range are masked out', a: 5, b: 10, drawList: [[0b11111_001]], expected: 6 },
          { name: 'a draw past the range is discarded, the next one kept', a: 5, b: 10, drawList: [[6], [2]], expected: 7 },
          { name: 'no draw when both bounds are equal', a: 5, b: 5, drawList: [], expected: 5 },
          { name: 'lowest draw on the whole safe range → MIN_SAFE_INTEGER', a: Number.MIN_SAFE_INTEGER, b: Number.MAX_SAFE_INTEGER, drawList: [[0, 0, 0, 0, 0, 0, 0]], expected: Number.MIN_SAFE_INTEGER },
          { name: 'highest kept draw on the whole safe range → MAX_SAFE_INTEGER', a: Number.MIN_SAFE_INTEGER, b: Number.MAX_SAFE_INTEGER, drawList: [[0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff], [0x3f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe]], expected: Number.MAX_SAFE_INTEGER },
        ])(
          '$name',
          ({ a, b, drawList, expected }) => {
            expect(GET_RANDOM_INT_BETWEEN({ a, b, getRandomValues: getRandomValuesFrom(drawList) })).toBe(expected)
          }
        )
      }
    )
  }
)
