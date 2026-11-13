import { describe, expect, it } from 'bun:test'
import { FROM_SNAKE_TO_CAMEL_CASE } from '../../ts/convert/from-snake-to-camel-case.util.js'

describe(
  'FROM_SNAKE_TO_CAMEL_CASE',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: 'a snake_case name joins with a capital', input: 'hello_world', expected: 'helloWorld' },
      { name: 'a second snake_case name joins the same way', input: 'user_name', expected: 'userName' },
      { name: 'each later word gets a capital', input: 'xml_http_request', expected: 'xmlHttpRequest' },
      { name: 'a lowercase word stays as is', input: 'hello', expected: 'hello' },
      { name: 'an uppercase word turns lowercase', input: 'WORLD', expected: 'world' },
      { name: 'an empty string stays empty', input: '', expected: '' },
      { name: 'a digit part joins as is, and the next word gets its capital', input: 'user_123_name', expected: 'user123Name' },
      { name: 'each digit part joins as is', input: 'test_1_test_2', expected: 'test1Test2' },
      { name: 'a double underscore counts as one', input: 'hello__world', expected: 'helloWorld' },
      { name: 'a triple underscore counts as one', input: 'user___name', expected: 'userName' },
      { name: 'a leading underscore is dropped', input: '_hello_world', expected: 'helloWorld' },
      { name: 'a leading underscore is dropped from another name', input: '_user_name', expected: 'userName' },
    ]

    it.each(testCases)(
      '$name: FROM_SNAKE_TO_CAMEL_CASE("$input") -> "$expected"',
      ({ input, expected }) => {
        expect(FROM_SNAKE_TO_CAMEL_CASE(input)).toBe(expected)
      }
    )
  }
)
