import { describe, expect, it } from 'bun:test'
import { FROM_JS_TO_CONSTANT_CASE } from '../../ts/convert/from-js-to-constant-case.util.js'

describe(
  'FROM_JS_TO_CONSTANT_CASE',
  () => {
    const testCases = [
      { input: 'helloWorld', expected: 'HELLO_WORLD' },
      { input: 'userName', expected: 'USER_NAME' },
      { input: 'XMLHttpRequest', expected: '_X_M_L_HTTP_REQUEST' },
      { input: 'hello', expected: 'HELLO' },
      { input: 'WORLD', expected: '_W_O_R_L_D' },
      { input: '', expected: '' },
      { input: 'user123Name', expected: 'USER123_NAME' },
      { input: 'test1Test2', expected: 'TEST1_TEST2' },
      { input: 'HTTPSConnection', expected: '_H_T_T_P_S_CONNECTION' },
      { input: 'APIKey', expected: '_A_P_I_KEY' },
    ]

    it.each(testCases)(
      'FROM_JS_TO_CONSTANT_CASE("$input") -> "$expected"',
      ({ input, expected }) => {
        expect(FROM_JS_TO_CONSTANT_CASE(input)).toBe(expected)
      }
    )
  }
)
