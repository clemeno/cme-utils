import { describe, expect, it } from 'bun:test'
import { TO_NUMBER } from '../../ts/convert/to-number.util.js'

describe(
  'TO_NUMBER',
  () => {
    const numberTestCases = [
      { name: 'positive integer', input: 123, expected: 123 },
      { name: 'zero', input: 0, expected: 0 },
      { name: 'negative integer', input: -123, expected: -123 },
      { name: 'decimal', input: 123.45, expected: 123.45 },
      { name: 'NaN', input: NaN, expected: NaN },
      { name: 'positive infinity', input: Infinity, expected: Infinity },
      { name: 'negative infinity', input: -Infinity, expected: -Infinity },
    ]

    it.each(numberTestCases)(
      'should return $name as-is',
      ({ input, expected }) => {
        if (isNaN(expected)) {
          expect(TO_NUMBER(input)).toBeNaN()
        } else {
          expect(TO_NUMBER(input)).toBe(expected)
        }
      }
    )

    const bigIntTestCases = [
      { name: 'positive BigInt', input: 123n, expected: 123 },
      { name: 'zero BigInt', input: 0n, expected: 0 },
      { name: 'negative BigInt', input: -123n, expected: -123 },
    ]

    it.each(bigIntTestCases)(
      'should convert $name to number',
      ({ input, expected }) => {
        expect(TO_NUMBER(input)).toBe(expected)
      }
    )

    const validStringTestCases = [
      { name: 'positive integer string', input: '123', expected: 123 },
      { name: 'zero string', input: '0', expected: 0 },
      { name: 'negative integer string', input: '-123', expected: -123 },
      { name: 'decimal string', input: '123.45', expected: 123.45 },
      { name: 'scientific notation string', input: '1.23e2', expected: 123 },
    ]

    it.each(validStringTestCases)(
      'should convert $name to number',
      ({ input, expected }) => {
        expect(TO_NUMBER(input)).toBe(expected)
      }
    )

    const invalidStringTestCases = [
      { name: 'empty string', input: '', expected: NaN },
      { name: 'non-numeric string', input: 'abc', expected: NaN },
      { name: 'mixed alphanumeric string', input: '123abc', expected: NaN },
      { name: 'multiple decimal points', input: '12.34.56', expected: NaN },
    ]

    it.each(invalidStringTestCases)(
      'should return NaN for $name',
      ({ input }) => {
        expect(TO_NUMBER(input)).toBeNaN()
      }
    )

    const valueOfTestCases = [
      { name: 'object with number valueOf', input: { valueOf: () => 42 }, expected: 42 },
      { name: 'object with boolean valueOf', input: { valueOf: () => true }, expected: 1 },
      { name: 'object with BigInt valueOf', input: { valueOf: () => 42n }, expected: 42 },
      { name: 'object with invalid string valueOf', input: { valueOf: () => 'abc' }, expected: NaN },
      { name: 'object with null valueOf', input: { valueOf: () => null }, expected: NaN },
      { name: 'object with undefined valueOf', input: { valueOf: () => undefined }, expected: NaN },
    ]

    it.each(valueOfTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        if (isNaN(expected)) {
          expect(TO_NUMBER(input)).toBeNaN()
        } else {
          expect(TO_NUMBER(input)).toBe(expected)
        }
      }
    )

    const nullUndefinedObjectTestCases = [
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'empty object', input: {} },
      { name: 'empty array', input: [] },
    ]

    it.each(nullUndefinedObjectTestCases)(
      'should return NaN for $name',
      ({ input }) => {
        expect(TO_NUMBER(input)).toBeNaN()
      }
    )
  }
)
