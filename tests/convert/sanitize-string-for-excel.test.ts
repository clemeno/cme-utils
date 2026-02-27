import { describe, expect, it } from 'bun:test'
import { SANITIZE_STRING_FOR_EXCEL } from '../../ts/convert/sanitize-string-for-excel.util.js'

describe(
  'SANITIZE_STRING_FOR_EXCEL',
  () => {
    const testCases = [
      { label: '"Hello@#$%World!"', input: 'Hello@#$%World!', expected: 'Hello@World!' },
      { label: '"Test©®™String"', input: 'Test©®™String', expected: 'TestTMString' },
      { label: '"Data±×÷String"', input: 'Data±×÷String', expected: 'DataString' },
      { label: '"Hello-World_Test,File!"', input: 'Hello-World_Test,File!', expected: 'Hello-World_Test,File!' },
      { label: '"User[0].Name"', input: 'User[0].Name', expected: 'User[0].Name' },
      { label: '"Path/To\\File.Name"', input: 'Path/To\\File.Name', expected: 'Path/To\\File.Name' },
      { label: '"café" (diacritics)', input: 'café', expected: 'cafe' },
      { label: '"naïve" (diacritics)', input: 'naïve', expected: 'naive' },
      { label: '"résumé" (diacritics)', input: 'résumé', expected: 'resume' },
      { label: '"Hello   World" (multi-space)', input: 'Hello   World', expected: 'Hello World' },
      { label: '"Line1\\n\\tLine2" (newline/tab)', input: 'Line1\n\tLine2', expected: 'Line1 Line2' },
      { label: '"Multiple   spaces   here"', input: 'Multiple   spaces   here', expected: 'Multiple spaces here' },
      { label: '""', input: '', expected: '' },
      { label: '"@#$%^&*()"', input: '@#$%^&*()', expected: '@()' },
      { label: '"©®™±×÷"', input: '©®™±×÷', expected: 'TM' },
    ]

    it.each(testCases)(
      'SANITIZE_STRING_FOR_EXCEL($label)',
      ({ input, expected }) => {
        expect(SANITIZE_STRING_FOR_EXCEL(input)).toBe(expected)
      }
    )
  }
)
