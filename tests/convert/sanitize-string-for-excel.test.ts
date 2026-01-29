import { describe, expect, it } from 'bun:test'
import { SANITIZE_STRING_FOR_EXCEL } from '../../ts/convert/sanitize-string-for-excel.util.js'

describe(
  'SANITIZE_STRING_FOR_EXCEL',
  () => {
    it(
      'should remove special characters',
      () => {
        expect(SANITIZE_STRING_FOR_EXCEL('Hello@#$%World!')).toBe('Hello@World!')
        expect(SANITIZE_STRING_FOR_EXCEL('Test©®™String')).toBe('TestTMString')
        expect(SANITIZE_STRING_FOR_EXCEL('Data±×÷String')).toBe('DataString')
      }
    )

    it(
      'should keep allowed special characters',
      () => {
        expect(SANITIZE_STRING_FOR_EXCEL('Hello-World_Test,File!')).toBe('Hello-World_Test,File!')
        expect(SANITIZE_STRING_FOR_EXCEL('User[0].Name')).toBe('User[0].Name')
        expect(SANITIZE_STRING_FOR_EXCEL('Path/To\\File.Name')).toBe('Path/To\\File.Name')
      }
    )

    it(
      'should normalize Unicode characters',
      () => {
        expect(SANITIZE_STRING_FOR_EXCEL('café')).toBe('cafe')
        expect(SANITIZE_STRING_FOR_EXCEL('naïve')).toBe('naive')
        expect(SANITIZE_STRING_FOR_EXCEL('résumé')).toBe('resume')
      }
    )

    it(
      'should replace multiple whitespace with single space',
      () => {
        expect(SANITIZE_STRING_FOR_EXCEL('Hello   World')).toBe('Hello World')
        expect(SANITIZE_STRING_FOR_EXCEL('Line1\n\tLine2')).toBe('Line1 Line2')
        expect(SANITIZE_STRING_FOR_EXCEL('Multiple   spaces   here')).toBe('Multiple spaces here')
      }
    )

    it(
      'should handle empty string',
      () => {
        expect(SANITIZE_STRING_FOR_EXCEL('')).toBe('')
      }
    )

    it(
      'should handle strings with only special characters',
      () => {
        expect(SANITIZE_STRING_FOR_EXCEL('@#$%^&*()')).toBe('@()')
        expect(SANITIZE_STRING_FOR_EXCEL('©®™±×÷')).toBe('TM')
      }
    )
  }
)
