import { describe, expect, it } from 'bun:test'
import { GET_ANY_ARRAY } from '../../ts/factory/get-any-array.util.js'

describe(
  'GET_ANY_ARRAY',
  () => {
    const emptyArrayTestCases = [
      { name: 'equal empty array', check: (result: any[]) => result.length === 0 },
      { name: 'is array', check: (result: any[]) => Array.isArray(result) },
    ]

    it.each(emptyArrayTestCases)(
      'should return an empty array - $name',
      ({ check }) => {
        const result = GET_ANY_ARRAY()
        expect(check(result)).toBe(true)
      }
    )

    const newInstanceTestCases = [
      { name: 'different instances', check: ({ result1, result2 }: { result1: any[], result2: any[] }) => result1 !== result2 },
      { name: 'equal content', check: ({ result1, result2 }: { result1: any[], result2: any[] }) => result1.length === result2.length },
    ]

    it.each(newInstanceTestCases)(
      'should return a new array instance each time - $name',
      ({ check }) => {
        const result1 = GET_ANY_ARRAY()
        const result2 = GET_ANY_ARRAY()
        expect(check({ result1, result2 })).toBe(true)
      }
    )

    const typeTestCases = [
      {
        name: 'instance of Array',
        check: (result: any[]) => result instanceof Array,
      },
      {
        name: 'accepts any elements',
        check: (result: any[]) => {
          result.push(1, 'string', {}, null, undefined)
          return result.length === 5
        },
      },
    ]

    it.each(typeTestCases)(
      'should return an array of type any[] - $name',
      ({ check }) => {
        const result = GET_ANY_ARRAY()
        expect(check(result)).toBe(true)
      }
    )
  }
)
