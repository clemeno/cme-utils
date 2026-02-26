import { describe, expect, it } from 'bun:test'
import { FROM_SNAKE_TO_JS_CASE } from '../../ts/convert/from-snake-to-js-case.util.js'

describe(
  'FROM_SNAKE_TO_JS_CASE',
  () => {
    const testCases = [
      { name: 'simple two-word snake case', input: 'hello_world', expected: 'helloWorld' },
      { name: 'three-word snake case', input: 'some_function_name', expected: 'someFunctionName' },
      { name: 'single word', input: 'single', expected: 'single' },
      { name: 'all lowercase', input: 'abc_def_ghi', expected: 'abcDefGhi' },
      { name: 'leading underscore two words', input: '_private_var', expected: '_privateVar' },
      { name: 'leading underscore single word', input: '_hello', expected: '_hello' },
      { name: 'UPPER_SNAKE_CASE', input: 'HELLO_WORLD', expected: 'helloWorld' },
      { name: 'empty string', input: '', expected: '' },
      { name: 'single char segments', input: 'a_b_c', expected: 'aBC' },
    ]

    it.each(testCases)(
      'converts $name — "$input" → "$expected"',
      ({ input, expected }) => {
        expect(FROM_SNAKE_TO_JS_CASE(input)).toBe(expected)
      }
    )
  }
)
