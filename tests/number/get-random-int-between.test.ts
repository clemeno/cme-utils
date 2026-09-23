import { afterEach, describe, expect, it } from 'bun:test'
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

    describe(
      'bounds with Math.random pinned',
      () => {
        const kOriginalRandom = Math.random

        afterEach(() => {
          Math.random = kOriginalRandom
        })

        it.each<{ name: string, random: number, input: Parameters<typeof GET_RANDOM_INT_BETWEEN>[0], expected: number }>([
          { name: 'lowest draw → min', random: 0, input: { a: 5, b: 10 }, expected: 5 },
          { name: 'highest draw → max (upper bound included)', random: 0.9999999, input: { a: 5, b: 10 }, expected: 10 },
          { name: 'highest draw with a > b → max', random: 0.9999999, input: { a: 10, b: 5 }, expected: 10 },
          { name: 'highest draw on a range of 2 → max', random: 0.9999999, input: { a: 5, b: 6 }, expected: 6 },
          { name: 'highest draw on negatives → max', random: 0.9999999, input: { a: -10, b: -5 }, expected: -5 },
        ])(
          '$name',
          ({ random, input, expected }) => {
            Math.random = () => random
            expect(GET_RANDOM_INT_BETWEEN(input)).toBe(expected)
          }
        )
      }
    )
  }
)
