import { describe, expect, it } from 'bun:test'
import { DISPLAY_NS_OR_NB } from '../../ts/convert/display-ns-or-nb.util.js'

describe(
  'DISPLAY_NS_OR_NB',
  () => {
    it('returns ns display when ns has a name', () => {
      const result = DISPLAY_NS_OR_NB({ ns: { nsName: 'My Network' }, nb: { nbIdentifier: 'NB-001' } })
      expect(result).toBe('My Network')
    })

    it('falls back to nb display when ns is empty', () => {
      const result = DISPLAY_NS_OR_NB({ ns: {}, nb: { nbIdentifier: 'NB-001' } })
      expect(result).toBe('NB-001')
    })

    it('falls back to nb display when ns is null', () => {
      const result = DISPLAY_NS_OR_NB({ ns: null, nb: { nbNumber: 'NB-5' } })
      expect(result).toBe('NB-5')
    })

    it('returns ns "ID <nsId>" when ns has only nsId', () => {
      const result = DISPLAY_NS_OR_NB({ ns: { nsId: 3 }, nb: { nbIdentifier: 'NB-001' } })
      expect(result).toBe('ID 3')
    })

    it('returns empty string when both ns and nb have no recognised fields', () => {
      const result = DISPLAY_NS_OR_NB({ ns: {}, nb: {} })
      expect(result).toBe('')
    })

    it('returns nb "ID <nbId>" when ns is empty and nb has only nbId', () => {
      const result = DISPLAY_NS_OR_NB({ ns: null, nb: { nbId: 42 } })
      expect(result).toBe('ID 42')
    })

    it('prefers ns over nb when ns has nsNumber', () => {
      const result = DISPLAY_NS_OR_NB({ ns: { nsNumber: 'NS-99' }, nb: { nbIdentifier: 'NB-01' } })
      expect(result).toBe('NS-99')
    })
  }
)
