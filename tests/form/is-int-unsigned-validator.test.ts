import { describe, expect, it } from 'bun:test'
import { IS_INT_UNSIGNED_VALIDATOR } from '../../ts/form/is-int-unsigned-validator.util.js'

describe(
  'IS_INT_UNSIGNED_VALIDATOR',
  () => {
    const validUnsignedIntTestCases = [
      { name: '0', value: 0 },
      { name: '1', value: 1 },
      { name: '100', value: 100 },
      { name: '4294967295 (max)', value: 4294967295 },
      { name: 'string "123"', value: '123' },
      { name: 'string "0"', value: '0' },
    ]

    it.each(validUnsignedIntTestCases)(
      'should return null for valid unsigned integer $name',
      ({ value }) => {
        expect(IS_INT_UNSIGNED_VALIDATOR({ value })).toBeNull()
      }
    )

    const negativeNumberTestCases = [
      { name: '-1', value: -1 },
      { name: 'string "-5"', value: '-5' },
    ]

    it.each(negativeNumberTestCases)(
      'should return error for negative number $name',
      ({ value }) => {
        const result = IS_INT_UNSIGNED_VALIDATOR({ value })
        expect(result).toEqual({ isSmallInt: true })
      }
    )

    const tooLargeTestCases = [
      { name: '4294967296', value: 4294967296 },
      { name: 'string "4294967296"', value: '4294967296' },
    ]

    it.each(tooLargeTestCases)(
      'should return error for number too large $name',
      ({ value }) => {
        const result = IS_INT_UNSIGNED_VALIDATOR({ value })
        expect(result).toEqual({ isSmallInt: true })
      }
    )

    const nonIntegerTestCases = [
      { name: '1.5', value: 1.5 },
      { name: 'string "1.5"', value: '1.5' },
    ]

    it.each(nonIntegerTestCases)(
      'should return error for non-integer number $name',
      ({ value }) => {
        const result = IS_INT_UNSIGNED_VALIDATOR({ value })
        expect(result).toEqual({ isSmallInt: true })
      }
    )

    const nonNumericStringTestCases = [
      { name: '"abc"', value: 'abc' },
      { name: '"12abc"', value: '12abc' },
    ]

    it.each(nonNumericStringTestCases)(
      'should return error for non-numeric string $name',
      ({ value }) => {
        const result = IS_INT_UNSIGNED_VALIDATOR({ value })
        expect(result).toEqual({ isSmallInt: true })
      }
    )

    const nullUndefinedEmptyTestCases = [
      { name: 'null', value: null },
      { name: 'undefined', value: undefined },
      { name: 'empty string', value: '' },
    ]

    it.each(nullUndefinedEmptyTestCases)(
      'should return null for $name',
      ({ value }) => {
        expect(IS_INT_UNSIGNED_VALIDATOR({ value })).toBeNull()
      }
    )

    const booleanTestCases = [
      { name: 'true', value: true },
      { name: 'false', value: false },
    ]

    it.each(booleanTestCases)(
      'should return null for boolean $name',
      ({ value }) => {
        const result = IS_INT_UNSIGNED_VALIDATOR({ value })
        expect(result).toBeNull()
      }
    )
  }
)
