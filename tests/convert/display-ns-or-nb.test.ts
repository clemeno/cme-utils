import { describe, expect, it } from 'bun:test'
import { DISPLAY_NS_OR_NB } from '../../ts/convert/display-ns-or-nb.util.js'

describe(
  'DISPLAY_NS_OR_NB',
  () => {
    const testCases: Array<{ name: string, input: { ns: unknown, nb: unknown }, expected: string }> = [
      { name: 'returns ns display when ns has a name', input: { ns: { nsName: 'My Network' }, nb: { nbIdentifier: 'NB-001' } }, expected: 'My Network' },
      { name: 'falls back to nb display when ns is empty', input: { ns: {}, nb: { nbIdentifier: 'NB-001' } }, expected: 'NB-001' },
      { name: 'falls back to nb display when ns is null', input: { ns: null, nb: { nbNumber: 'NB-5' } }, expected: 'NB-5' },
      { name: 'returns ns "ID <nsId>" when ns has only nsId', input: { ns: { nsId: 3 }, nb: { nbIdentifier: 'NB-001' } }, expected: 'ID 3' },
      { name: 'returns empty string when both have no recognised fields', input: { ns: {}, nb: {} }, expected: '' },
      { name: 'returns nb "ID <nbId>" when ns is empty and nb has only nbId', input: { ns: null, nb: { nbId: 42 } }, expected: 'ID 42' },
      { name: 'prefers ns over nb when ns has nsNumber', input: { ns: { nsNumber: 'NS-99' }, nb: { nbIdentifier: 'NB-01' } }, expected: 'NS-99' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(DISPLAY_NS_OR_NB(input)).toBe(expected)
      }
    )
  }
)
