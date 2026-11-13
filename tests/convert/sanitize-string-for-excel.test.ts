import { describe, expect, it } from 'bun:test'
import { SANITIZE_STRING_FOR_EXCEL } from '../../ts/convert/sanitize-string-for-excel.util.js'

describe(
  'SANITIZE_STRING_FOR_EXCEL',
  () => {
    const testCases: Array<{ name: string, input: string, expected: string }> = [
      { name: '"Hello@#$%World!"', input: 'Hello@#$%World!', expected: 'Hello@World!' },
      { name: '"Test©®™String"', input: 'Test©®™String', expected: 'TestTMString' },
      { name: '"Data±×÷String"', input: 'Data±×÷String', expected: 'DataString' },
      { name: '"Hello-World_Test,File!"', input: 'Hello-World_Test,File!', expected: 'Hello-World_Test,File!' },
      { name: '"User[0].Name"', input: 'User[0].Name', expected: 'User[0].Name' },
      { name: '"Path/To\\File.Name"', input: 'Path/To\\File.Name', expected: 'Path/To\\File.Name' },
      { name: '"café" (diacritics)', input: 'café', expected: 'cafe' },
      { name: '"naïve" (diacritics)', input: 'naïve', expected: 'naive' },
      { name: '"résumé" (diacritics)', input: 'résumé', expected: 'resume' },
      { name: '"Hello   World" (multi-space)', input: 'Hello   World', expected: 'Hello World' },
      { name: '"Line1\\n\\tLine2" (newline/tab)', input: 'Line1\n\tLine2', expected: 'Line1 Line2' },
      { name: '"Multiple   spaces   here"', input: 'Multiple   spaces   here', expected: 'Multiple spaces here' },
      { name: '""', input: '', expected: '' },
      { name: '"@#$%^&*()"', input: '@#$%^&*()', expected: '@()' },
      { name: '"©®™±×÷"', input: '©®™±×÷', expected: 'TM' },
    ]

    it.each(testCases)(
      'SANITIZE_STRING_FOR_EXCEL($name)',
      ({ input, expected }) => {
        expect(SANITIZE_STRING_FOR_EXCEL(input)).toBe(expected)
      }
    )
  }
)
