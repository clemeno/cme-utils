import { describe, expect, it } from 'bun:test'
import { FROM_SNAKE_TO_CAMEL_CASE } from '../../ts/convert/from-snake-to-camel-case.util.js'

describe(
  'FROM_SNAKE_TO_CAMEL_CASE',
  () => {
    it(
      'should convert snake_case to camelCase',
      () => {
        expect(FROM_SNAKE_TO_CAMEL_CASE('hello_world')).toBe('helloWorld')
        expect(FROM_SNAKE_TO_CAMEL_CASE('user_name')).toBe('userName')
        expect(FROM_SNAKE_TO_CAMEL_CASE('xml_http_request')).toBe('xmlHttpRequest')
      }
    )

    it(
      'should handle single words',
      () => {
        expect(FROM_SNAKE_TO_CAMEL_CASE('hello')).toBe('hello')
        expect(FROM_SNAKE_TO_CAMEL_CASE('WORLD')).toBe('world')
      }
    )

    it(
      'should handle empty string',
      () => {
        expect(FROM_SNAKE_TO_CAMEL_CASE('')).toBe('')
      }
    )

    it(
      'should handle strings with numbers',
      () => {
        expect(FROM_SNAKE_TO_CAMEL_CASE('user_123_name')).toBe('user123Name')
        expect(FROM_SNAKE_TO_CAMEL_CASE('test_1_test_2')).toBe('test1Test2')
      }
    )

    it(
      'should handle multiple consecutive underscores',
      () => {
        expect(FROM_SNAKE_TO_CAMEL_CASE('hello__world')).toBe('helloWorld')
        expect(FROM_SNAKE_TO_CAMEL_CASE('user___name')).toBe('userName')
      }
    )

    it(
      'should handle strings starting with underscore',
      () => {
        expect(FROM_SNAKE_TO_CAMEL_CASE('_hello_world')).toBe('helloWorld')
        expect(FROM_SNAKE_TO_CAMEL_CASE('_user_name')).toBe('userName')
      }
    )
  }
)
