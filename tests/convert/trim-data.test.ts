import { describe, expect, it } from 'bun:test'
import { TRIM_DATA } from '../../ts/convert/trim-data.util.js'

describe(
  'TRIM_DATA',
  () => {
    // toStrictEqual: a key kept with an `undefined` value must fail, toEqual would ignore it
    it.each<{ name: string, input: Parameters<typeof TRIM_DATA>[0], expected: unknown }>([
      { name: 'returns undefined for null input', input: { object: null }, expected: undefined },
      { name: 'returns undefined for undefined input', input: { object: undefined }, expected: undefined },
      { name: 'returns a number primitive as-is', input: { object: 42 }, expected: 42 },
      { name: 'returns a string primitive as-is', input: { object: 'hello' }, expected: 'hello' },
      { name: 'returns a boolean primitive as-is', input: { object: true }, expected: true },
      { name: 'returns a falsy 0 primitive as-is', input: { object: 0 }, expected: 0 },
      { name: 'removes null values from a flat object', input: { object: { a: 1, b: null, c: 3 } }, expected: { a: 1, c: 3 } },
      { name: 'removes undefined values from a flat object', input: { object: { a: undefined, b: 2 } }, expected: { b: 2 } },
      { name: 'returns undefined for a fully-null object', input: { object: { a: null, b: undefined } }, expected: undefined },
      { name: 'recursively removes null from nested objects', input: { object: { a: { b: null, c: 1 }, d: 2 } }, expected: { a: { c: 1 }, d: 2 } },
      { name: 'maps array elements through TRIM_DATA', input: { object: [1, null, 2] }, expected: [1, undefined, 2] },
      { name: 'trims objects inside arrays', input: { object: [{ a: 1, b: null }, { a: 2, b: 3 }] }, expected: [{ a: 1 }, { a: 2, b: 3 }] },
      { name: 'converts Date values to ISO strings', input: { object: { d: new Date('2023-06-15T12:00:00.000Z') } }, expected: { d: '2023-06-15T12:00:00.000Z' } },
      { name: 'keeps all fields when none are null', input: { object: { a: 1, b: 'x', c: false } }, expected: { a: 1, b: 'x', c: false } },
      // exercises the Array.isArray(res[k]) branch (object whose value IS an array)
      { name: 'trims arrays nested inside an object property', input: { object: { items: [1, null, 2], name: 'test' } }, expected: { items: [1, undefined, 2], name: 'test' } },
      { name: 'trims objects inside an array that is itself a property value', input: { object: { rows: [{ a: 1, b: null }, { a: 2 }], id: 99 } }, expected: { rows: [{ a: 1 }, { a: 2 }], id: 99 } },
      { name: 'accepts depth 5 and still trims recursively', input: { object: { a: { b: null, c: 1 } }, depth: 5 }, expected: { a: { c: 1 } } },
      // depth is only decremented, never checked: nested levels are still trimmed
      { name: 'accepts depth 1 (not enforced: the nested object is still trimmed)', input: { object: { a: { b: null, c: 1 }, d: 2 }, depth: 1 }, expected: { a: { c: 1 }, d: 2 } },
      { name: 'accepts depth 0 (not enforced: the nested object is still trimmed)', input: { object: { a: { b: null, c: 1 } }, depth: 0 }, expected: { a: { c: 1 } } },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(TRIM_DATA(input)).toStrictEqual(expected)
      }
    )
  }
)
