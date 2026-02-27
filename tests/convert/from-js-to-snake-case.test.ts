import { describe, expect, it } from 'bun:test'
import { FROM_JS_TO_SNAKE_CASE } from '../../ts/convert/from-js-to-snake-case.util.js'

describe(
  'FROM_JS_TO_SNAKE_CASE',
  () => {
    const testCases = [
      { input: 'helloWorld', expected: 'hello_world' },
      { input: 'userName', expected: 'user_name' },
      { input: 'XMLHttpRequest', expected: '_x_m_l_http_request' },
      { input: 'hello', expected: 'hello' },
      { input: 'WORLD', expected: '_w_o_r_l_d' },
      { input: '', expected: '' },
      { input: 'user123Name', expected: 'user123_name' },
      { input: 'test1Test2', expected: 'test1_test2' },
      { input: 'HTTPSConnection', expected: '_h_t_t_p_s_connection' },
      { input: 'APIKey', expected: '_a_p_i_key' },
    ]

    it.each(testCases)(
      'FROM_JS_TO_SNAKE_CASE("$input") -> "$expected"',
      ({ input, expected }) => {
        expect(FROM_JS_TO_SNAKE_CASE(input)).toBe(expected)
      }
    )
  }
)
