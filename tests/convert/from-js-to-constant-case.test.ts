import { describe, expect, it } from 'bun:test'
import { FROM_JS_TO_CONSTANT_CASE } from '../../ts/convert/from-js-to-constant-case.util.js'

describe(
  'FROM_JS_TO_CONSTANT_CASE',
  () => {
    it(
      'should convert camelCase to CONSTANT_CASE',
      () => {
        expect(FROM_JS_TO_CONSTANT_CASE('helloWorld')).toBe('HELLO_WORLD')
        expect(FROM_JS_TO_CONSTANT_CASE('userName')).toBe('USER_NAME')
        expect(FROM_JS_TO_CONSTANT_CASE('XMLHttpRequest')).toBe('_X_M_L_HTTP_REQUEST')
      }
    )

    it(
      'should handle single words',
      () => {
        expect(FROM_JS_TO_CONSTANT_CASE('hello')).toBe('HELLO')
        expect(FROM_JS_TO_CONSTANT_CASE('WORLD')).toBe('_W_O_R_L_D')
      }
    )

    it(
      'should handle empty string',
      () => {
        expect(FROM_JS_TO_CONSTANT_CASE('')).toBe('')
      }
    )

    it(
      'should handle strings with numbers',
      () => {
        expect(FROM_JS_TO_CONSTANT_CASE('user123Name')).toBe('USER123_NAME')
        expect(FROM_JS_TO_CONSTANT_CASE('test1Test2')).toBe('TEST1_TEST2')
      }
    )

    it(
      'should handle consecutive uppercase letters',
      () => {
        expect(FROM_JS_TO_CONSTANT_CASE('HTTPSConnection')).toBe('_H_T_T_P_S_CONNECTION')
        expect(FROM_JS_TO_CONSTANT_CASE('APIKey')).toBe('_A_P_I_KEY')
      }
    )
  }
)
