import { describe, expect, it } from 'bun:test'
import { FROM_JS_TO_SNAKE_CASE } from '../../ts/convert/from-js-to-snake-case.util.js'

describe(
  'FROM_JS_TO_SNAKE_CASE',
  () => {
    it(
      'should convert camelCase to snake_case',
      () => {
        expect(FROM_JS_TO_SNAKE_CASE('helloWorld')).toBe('hello_world')
        expect(FROM_JS_TO_SNAKE_CASE('userName')).toBe('user_name')
        expect(FROM_JS_TO_SNAKE_CASE('XMLHttpRequest')).toBe('_x_m_l_http_request')
      }
    )

    it(
      'should handle single words',
      () => {
        expect(FROM_JS_TO_SNAKE_CASE('hello')).toBe('hello')
        expect(FROM_JS_TO_SNAKE_CASE('WORLD')).toBe('_w_o_r_l_d')
      }
    )

    it(
      'should handle empty string',
      () => {
        expect(FROM_JS_TO_SNAKE_CASE('')).toBe('')
      }
    )

    it(
      'should handle strings with numbers',
      () => {
        expect(FROM_JS_TO_SNAKE_CASE('user123Name')).toBe('user123_name')
        expect(FROM_JS_TO_SNAKE_CASE('test1Test2')).toBe('test1_test2')
      }
    )

    it(
      'should handle consecutive uppercase letters',
      () => {
        expect(FROM_JS_TO_SNAKE_CASE('HTTPSConnection')).toBe('_h_t_t_p_s_connection')
        expect(FROM_JS_TO_SNAKE_CASE('APIKey')).toBe('_a_p_i_key')
      }
    )
  }
)
