import { describe, expect, it } from 'bun:test'
import { DISPLAY_NB } from '../../ts/convert/display-nb.util.js'

describe(
  'DISPLAY_NB',
  () => {
    it('returns nbIdentifier when present', () => {
      expect(DISPLAY_NB({ nbIdentifier: 'ABC-001' })).toBe('ABC-001')
    })

    it('falls back to nbNumber when nbIdentifier is absent', () => {
      expect(DISPLAY_NB({ nbNumber: 'NB-42' })).toBe('NB-42')
    })

    it('falls back to "ID <nbId>" when only nbId is present', () => {
      expect(DISPLAY_NB({ nbId: 99 })).toBe('ID 99')
    })

    it('returns empty string when object has none of the recognised fields', () => {
      expect(DISPLAY_NB({})).toBe('')
    })

    it('returns empty string for null', () => {
      expect(DISPLAY_NB(null)).toBe('')
    })

    it('returns empty string for undefined', () => {
      expect(DISPLAY_NB(undefined)).toBe('')
    })

    it('prefers nbIdentifier over nbNumber and nbId', () => {
      expect(DISPLAY_NB({ nbIdentifier: 'ID-1', nbNumber: 'N-2', nbId: 3 })).toBe('ID-1')
    })

    it('prefers nbNumber over nbId when nbIdentifier is absent', () => {
      expect(DISPLAY_NB({ nbNumber: 'N-2', nbId: 3 })).toBe('N-2')
    })
  }
)
