import { describe, expect, it } from 'bun:test'
import { GET_ANY_OBJECT } from '../../ts/factory/get-any-object.util.js'

describe(
  'GET_ANY_OBJECT',
  () => {
    const emptyObjectTestCases = [
      { name: 'equal empty object', check: (result: any) => Object.keys(result).length === 0 },
      { name: 'is object type', check: (result: any) => typeof result === 'object' },
      { name: 'not null', check: (result: any) => result !== null },
    ]

    it.each(emptyObjectTestCases)(
      'should return an empty object - $name',
      ({ check }) => {
        const result = GET_ANY_OBJECT()
        expect(check(result)).toBe(true)
      }
    )

    const newInstanceTestCases = [
      { name: 'different instances', check: ({ result1, result2 }: { result1: any, result2: any }) => result1 !== result2 },
      { name: 'equal content', check: ({ result1, result2 }: { result1: any, result2: any }) => JSON.stringify(result1) === JSON.stringify(result2) },
    ]

    it.each(newInstanceTestCases)(
      'should return a new object instance each time - $name',
      ({ check }) => {
        const result1 = GET_ANY_OBJECT()
        const result2 = GET_ANY_OBJECT()
        expect(check({ result1, result2 })).toBe(true)
      }
    )

    const flexiblePropertiesTestCases = [
      {
        name: 'accepts number property',
        check: (result: any) => {
          result.number = 42
          return result.number === 42
        },
      },
      {
        name: 'accepts string property',
        check: (result: any) => {
          result.string = 'test'
          return result.string === 'test'
        },
      },
      {
        name: 'accepts array property',
        check: (result: any) => {
          result.array = [1, 2, 3]
          return JSON.stringify(result.array) === JSON.stringify([1, 2, 3])
        },
      },
      {
        name: 'accepts nested object property',
        check: (result: any) => {
          result.nested = { key: 'value' }
          return JSON.stringify(result.nested) === JSON.stringify({ key: 'value' })
        },
      },
    ]

    it.each(flexiblePropertiesTestCases)(
      'should return an object that accepts any properties - $name',
      ({ check }) => {
        const result = GET_ANY_OBJECT()
        expect(check(result)).toBe(true)
      }
    )
  }
)
