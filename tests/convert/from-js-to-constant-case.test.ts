import { describe, expect, it } from 'bun:test'
import { FROM_JS_TO_CONSTANT_CASE } from '../../ts/convert/from-js-to-constant-case.util.js'

describe(
  'FROM_JS_TO_CONSTANT_CASE',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: 'a camelCase name splits at its capital', input: 'helloWorld', expected: 'HELLO_WORLD' },
      { name: 'a second camelCase name splits the same way', input: 'userName', expected: 'USER_NAME' },
      { name: 'an acronym prefix gets one underscore per capital', input: 'XMLHttpRequest', expected: '_X_M_L_HTTP_REQUEST' },
      { name: 'a lowercase word only changes case', input: 'hello', expected: 'HELLO' },
      { name: 'an uppercase word gets one underscore per capital', input: 'WORLD', expected: '_W_O_R_L_D' },
      { name: 'an empty string stays empty', input: '', expected: '' },
      { name: 'digits stay with the word before them', input: 'user123Name', expected: 'USER123_NAME' },
      { name: 'a capital starts a new word, and digits stay with the word before', input: 'test1Test2', expected: 'TEST1_TEST2' },
      { name: 'a long acronym prefix gets one underscore per capital', input: 'HTTPSConnection', expected: '_H_T_T_P_S_CONNECTION' },
      { name: 'a short acronym prefix gets one underscore per capital', input: 'APIKey', expected: '_A_P_I_KEY' },
    ]

    it.each(testCases)(
      '$name: FROM_JS_TO_CONSTANT_CASE("$input") -> "$expected"',
      ({ input, expected }) => {
        expect(FROM_JS_TO_CONSTANT_CASE(input)).toBe(expected)
      }
    )
  }
)
