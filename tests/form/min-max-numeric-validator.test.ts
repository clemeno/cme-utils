import { describe, expect, it } from 'bun:test'
import { MIN_MAX_NUMERIC_VALIDATOR } from '../../ts/form/min-max-numeric-validator.util.js'

describe(
  'MIN_MAX_NUMERIC_VALIDATOR',
  () => {
    const withinRangeTestCases: Array<{ name: string, value: number | string }> = [
      { name: 'minimum value', value: 0 },
      { name: 'middle value', value: 50 },
      { name: 'maximum value', value: 100 },
      { name: 'string number', value: '25' },
      { name: 'string minimum', value: '0' },
      { name: 'string maximum', value: '100' },
    ]

    it.each(withinRangeTestCases)(
      'should return null for $name within range',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 0, max: 100 })
        expect(validator({ value })).toBeNull()
      }
    )

    const belowMinimumTestCases: Array<{ name: string, value: number | string }> = [
      { name: 'number below minimum', value: 5 },
      { name: 'string below minimum', value: '5' },
    ]

    it.each(belowMinimumTestCases)(
      'should return error for $name',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 10, max: 100 })
        expect(validator({ value })).toEqual({ minMaxNumeric: true })
      }
    )

    const aboveMaximumTestCases: Array<{ name: string, value: number | string }> = [
      { name: 'number above maximum', value: 100 },
      { name: 'string above maximum', value: '100' },
    ]

    it.each(aboveMaximumTestCases)(
      'should return error for $name',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 0, max: 50 })
        expect(validator({ value })).toEqual({ minMaxNumeric: true })
      }
    )

    const nonNumericTestCases: Array<{ name: string, value: string | {} }> = [
      { name: 'non-numeric string', value: 'abc' },
      { name: 'object', value: {} },
    ]

    it.each(nonNumericTestCases)(
      'should return error for $name',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 0, max: 100 })
        expect(validator({ value })).toEqual({ minMaxNumeric: true })
      }
    )

    const nullUndefinedTestCases: Array<{ name: string, value: null | undefined | string }> = [
      { name: 'null', value: null },
      { name: 'undefined', value: undefined },
      { name: 'empty string', value: '' },
    ]

    it.each(nullUndefinedTestCases)(
      'should return null for $name',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 0, max: 100 })
        expect(validator({ value })).toBeNull()
      }
    )

    const negativeRangeTestCases: Array<{ name: string, value: number }> = [
      { name: 'negative minimum', value: -50 },
      { name: 'zero in negative range', value: 0 },
      { name: 'positive maximum', value: 50 },
    ]

    it.each(negativeRangeTestCases)(
      'should work with negative ranges - valid $name',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: -50, max: 50 })
        expect(validator({ value })).toBeNull()
      }
    )

    const outsideNegativeRangeTestCases: Array<{ name: string, value: number }> = [
      { name: '-100', value: -100 },
      { name: '100', value: 100 },
    ]

    it.each(outsideNegativeRangeTestCases)(
      'should return error for values outside negative range ($name)',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: -50, max: 50 })
        expect(validator({ value })).toEqual({ minMaxNumeric: true })
      }
    )

    const decimalRangeTestCases: Array<{ name: string, value: number | string }> = [
      { name: 'decimal within range', value: 1.5 },
      { name: 'string decimal within range', value: '2.5' },
    ]

    it.each(decimalRangeTestCases)(
      'should work with decimal ranges - valid $name',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 0.5, max: 10.5 })
        expect(validator({ value })).toBeNull()
      }
    )

    const outsideDecimalRangeTestCases: Array<{ name: string, value: number }> = [
      { name: '0.3', value: 0.3 },
      { name: '11.0', value: 11.0 },
    ]

    it.each(outsideDecimalRangeTestCases)(
      'should return error for values outside decimal range ($name)',
      ({ value }) => {
        const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 0.5, max: 10.5 })
        expect(validator({ value })).toEqual({ minMaxNumeric: true })
      }
    )
  }
)
