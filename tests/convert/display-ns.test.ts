import { describe, expect, it } from 'bun:test'
import { DISPLAY_NS } from '../../ts/convert/display-ns.util.js'

describe(
  'DISPLAY_NS',
  () => {
    const testCases = [
      { label: 'returns nsName when present', input: { nsName: 'Main Network' }, expected: 'Main Network' },
      { label: 'falls back to nsNumber when nsName is absent', input: { nsNumber: 'NS-10' }, expected: 'NS-10' },
      { label: 'falls back to "ID <nsId>" when only nsId is present', input: { nsId: 7 }, expected: 'ID 7' },
      { label: 'returns empty string for unrecognised fields', input: {}, expected: '' },
      { label: 'returns empty string for null', input: null, expected: '' },
      { label: 'returns empty string for undefined', input: undefined, expected: '' },
      { label: 'prefers nsName over nsNumber and nsId', input: { nsName: 'Alpha', nsNumber: 'NS-1', nsId: 1 }, expected: 'Alpha' },
      { label: 'prefers nsNumber over nsId when nsName is absent', input: { nsNumber: 'NS-1', nsId: 1 }, expected: 'NS-1' },
    ]

    it.each(testCases)(
      '$label',
      ({ input, expected }) => {
        expect(DISPLAY_NS(input)).toBe(expected)
      }
    )
  }
)
