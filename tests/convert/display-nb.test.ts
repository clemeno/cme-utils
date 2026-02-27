import { describe, expect, it } from 'bun:test'
import { DISPLAY_NB } from '../../ts/convert/display-nb.util.js'

describe(
  'DISPLAY_NB',
  () => {
    const testCases = [
      { label: 'returns nbIdentifier when present', input: { nbIdentifier: 'ABC-001' }, expected: 'ABC-001' },
      { label: 'falls back to nbNumber when nbIdentifier is absent', input: { nbNumber: 'NB-42' }, expected: 'NB-42' },
      { label: 'falls back to "ID <nbId>" when only nbId is present', input: { nbId: 99 }, expected: 'ID 99' },
      { label: 'returns empty string for unrecognised fields', input: {}, expected: '' },
      { label: 'returns empty string for null', input: null, expected: '' },
      { label: 'returns empty string for undefined', input: undefined, expected: '' },
      { label: 'prefers nbIdentifier over nbNumber and nbId', input: { nbIdentifier: 'ID-1', nbNumber: 'N-2', nbId: 3 }, expected: 'ID-1' },
      { label: 'prefers nbNumber over nbId when nbIdentifier is absent', input: { nbNumber: 'N-2', nbId: 3 }, expected: 'N-2' },
    ]

    it.each(testCases)(
      '$label',
      ({ input, expected }) => {
        expect(DISPLAY_NB(input)).toBe(expected)
      }
    )
  }
)
