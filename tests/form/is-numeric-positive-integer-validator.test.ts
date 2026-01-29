import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR } from '../../ts/form/is-numeric-positive-integer-validator.util.js'

describe(
  'IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR',
  () => {
    const validPositiveIntTestCases = [
      { name: '0', value: 0 },
      { name: '1', value: 1 },
      { name: '100', value: 100 },
      { name: '999999', value: 999999 },
    ]

    it.each(validPositiveIntTestCases)(
      'should return null for valid positive integer $name',
      ({ value }) => {
        expect(IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })).toBeNull()
      }
    )

    const validPositiveIntStringTestCases = [
      { name: '"0"', value: '0' },
      { name: '"1"', value: '1' },
      { name: '"123"', value: '123' },
      { name: '"999"', value: '999' },
    ]

    it.each(validPositiveIntStringTestCases)(
      'should return null for valid positive integer string $name',
      ({ value }) => {
        expect(IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })).toBeNull()
      }
    )

    const negativeNumberTestCases = [
      { name: '-1', value: -1 },
      { name: 'string "-5"', value: '-5' },
    ]

    it.each(negativeNumberTestCases)(
      'should return error for negative number $name',
      ({ value }) => {
        const result = IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })
        expect(result).toEqual({ isNumericPositiveInteger: true })
      }
    )

    const decimalNumberTestCases = [
      { name: '1.5', value: 1.5 },
      { name: 'string "1.5"', value: '1.5' },
    ]

    it.each(decimalNumberTestCases)(
      'should return error for decimal number $name',
      ({ value }) => {
        const result = IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })
        expect(result).toEqual({ isNumericPositiveInteger: true })
      }
    )

    const nonNumericStringTestCases = [
      { name: '"abc"', value: 'abc' },
      { name: 'string "123abc"', value: '123abc' },
    ]

    it.each(nonNumericStringTestCases)(
      'should return error for non-numeric string $name',
      ({ value }) => {
        const result = IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })
        expect(result).toEqual({ isNumericPositiveInteger: true })
      }
    )

    const whitespaceStringTestCases = [
      { name: '" 123 "', value: ' 123 ' },
      { name: '"123 "', value: '123 ' },
    ]

    it.each(whitespaceStringTestCases)(
      'should return error for string with whitespace $name',
      ({ value }) => {
        const result = IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })
        expect(result).toEqual({ isNumericPositiveInteger: true })
      }
    )

    it(
      'should return error for NaN',
      () => {
        const result = IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: NaN })
        expect(result).toEqual({ isNumericPositiveInteger: true })
      }
    )

    const nonNumberNonStringTestCases = [
      { name: 'true', value: true },
      { name: 'empty object', value: {} },
      { name: 'empty array', value: [] },
    ]

    it.each(nonNumberNonStringTestCases)(
      'should return error for non-number/non-string type $name',
      ({ value }) => {
        const result = IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })
        expect(result).toEqual({ isNumericPositiveInteger: true })
      }
    )

    const nullUndefinedTestCases = [
      { name: 'null', value: null },
      { name: 'undefined', value: undefined },
    ]

    it.each(nullUndefinedTestCases)(
      'should return error for $name',
      ({ value }) => {
        expect(IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value })).toEqual({ isNumericPositiveInteger: true })
      }
    )
  }
)
