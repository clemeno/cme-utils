import { describe, expect, it } from 'bun:test'
import { FROM_SNAKE_TO_CAMEL_CASE } from '../../ts/convert/from-snake-to-camel-case.util.js'

describe(
  'FROM_SNAKE_TO_CAMEL_CASE',
  () => {
    const testCases = [
      { input: 'hello_world', expected: 'helloWorld' },
      { input: 'user_name', expected: 'userName' },
      { input: 'xml_http_request', expected: 'xmlHttpRequest' },
      { input: 'hello', expected: 'hello' },
      { input: 'WORLD', expected: 'world' },
      { input: '', expected: '' },
      { input: 'user_123_name', expected: 'user123Name' },
      { input: 'test_1_test_2', expected: 'test1Test2' },
      { input: 'hello__world', expected: 'helloWorld' },
      { input: 'user___name', expected: 'userName' },
      { input: '_hello_world', expected: 'helloWorld' },
      { input: '_user_name', expected: 'userName' },
    ]

    it.each(testCases)(
      'FROM_SNAKE_TO_CAMEL_CASE("$input") -> "$expected"',
      ({ input, expected }) => {
        expect(FROM_SNAKE_TO_CAMEL_CASE(input)).toBe(expected)
      }
    )
  }
)
