import { describe, expect, it } from 'bun:test'
import { DISPLAY_NS } from '../../ts/convert/display-ns.util.js'

describe(
  'DISPLAY_NS',
  () => {
    it('returns nsName when present', () => {
      expect(DISPLAY_NS({ nsName: 'Main Network' })).toBe('Main Network')
    })

    it('falls back to nsNumber when nsName is absent', () => {
      expect(DISPLAY_NS({ nsNumber: 'NS-10' })).toBe('NS-10')
    })

    it('falls back to "ID <nsId>" when only nsId is present', () => {
      expect(DISPLAY_NS({ nsId: 7 })).toBe('ID 7')
    })

    it('returns empty string for an object with none of the recognised fields', () => {
      expect(DISPLAY_NS({})).toBe('')
    })

    it('returns empty string for null', () => {
      expect(DISPLAY_NS(null)).toBe('')
    })

    it('returns empty string for undefined', () => {
      expect(DISPLAY_NS(undefined)).toBe('')
    })

    it('prefers nsName over nsNumber and nsId', () => {
      expect(DISPLAY_NS({ nsName: 'Alpha', nsNumber: 'NS-1', nsId: 1 })).toBe('Alpha')
    })

    it('prefers nsNumber over nsId when nsName is absent', () => {
      expect(DISPLAY_NS({ nsNumber: 'NS-1', nsId: 1 })).toBe('NS-1')
    })
  }
)
