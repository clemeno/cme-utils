import { describe, expect, it } from 'bun:test'
import { FROM_JS_TO_SNAKE_CASE } from '../../ts/convert/from-js-to-snake-case.util.js'

describe(
  'FROM_JS_TO_SNAKE_CASE',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: 'a camelCase name splits at its capital', input: 'helloWorld', expected: 'hello_world' },
      { name: 'a second camelCase name splits the same way', input: 'userName', expected: 'user_name' },
      { name: 'an acronym prefix gets one underscore per capital', input: 'XMLHttpRequest', expected: '_x_m_l_http_request' },
      { name: 'a lowercase word stays as is', input: 'hello', expected: 'hello' },
      { name: 'an uppercase word gets one underscore per capital', input: 'WORLD', expected: '_w_o_r_l_d' },
      { name: 'an empty string stays empty', input: '', expected: '' },
      { name: 'digits stay with the word before them', input: 'user123Name', expected: 'user123_name' },
      { name: 'a capital starts a new word, and digits stay with the word before', input: 'test1Test2', expected: 'test1_test2' },
      { name: 'a long acronym prefix gets one underscore per capital', input: 'HTTPSConnection', expected: '_h_t_t_p_s_connection' },
      { name: 'a short acronym prefix gets one underscore per capital', input: 'APIKey', expected: '_a_p_i_key' },
    ]

    it.each(testCases)(
      '$name: FROM_JS_TO_SNAKE_CASE("$input") -> "$expected"',
      ({ input, expected }) => {
        expect(FROM_JS_TO_SNAKE_CASE(input)).toBe(expected)
      }
    )
  }
)
