import { describe, expect, it } from 'bun:test'
import { FROM_SNAKE_TO_CLASS_CASE } from '../../ts/convert/from-snake-to-class-case.util.js'

describe(
  'FROM_SNAKE_TO_CLASS_CASE',
  () => {
    const testCases = [
      { name: 'simple two-word snake case', input: 'hello_world', expected: 'HelloWorld' },
      { name: 'three-word snake case', input: 'some_function_name', expected: 'SomeFunctionName' },
      { name: 'single word', input: 'single', expected: 'Single' },
      { name: 'already capitalised', input: 'HELLO_WORLD', expected: 'HelloWorld' },
      { name: 'mixed case segments', input: 'hElLo_wOrLd', expected: 'HelloWorld' },
      { name: 'empty string', input: '', expected: '' },
      { name: 'leading underscore', input: '_private', expected: 'Private' },
      { name: 'trailing underscore', input: 'trailing_', expected: 'Trailing' },
      { name: 'consecutive underscores', input: 'a__b', expected: 'AB' },
      { name: 'all lowercase', input: 'abc_def_ghi', expected: 'AbcDefGhi' },
      { name: 'single char segments', input: 'a_b_c', expected: 'ABC' },
    ]

    it.each(testCases)(
      'converts $name — "$input" → "$expected"',
      ({ input, expected }) => {
        expect(FROM_SNAKE_TO_CLASS_CASE(input)).toBe(expected)
      }
    )
  }
)
