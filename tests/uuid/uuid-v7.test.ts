import { afterEach, describe, expect, it, mock } from 'bun:test'
import { UUID_V7 } from '../../ts/uuid/uuid-v7.util.js'

describe(
  'UUID_V7',
  () => {
    const kUuidV7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i // version 7, RFC variant

    const originalGetRandomValues = crypto.getRandomValues

    // restore even when an assertion fails, so a broken case can't leak mocks into other tests
    afterEach(() => {
      crypto.getRandomValues = originalGetRandomValues
    })

    /** Returns the unix ms timestamp stored in the first 48 bits of a UUID v7. */
    function getTimestampMs (inUuid: string): number {
      return Number.parseInt(inUuid.slice(0, 8) + inUuid.slice(9, 13), 16)
    }

    it.each<{ name: string, setup: () => void }>([
      { name: 'generate a valid UUID v7', setup: () => {} },
      { name: 'fallback to Math.random when getRandomValues fails', setup: () => { crypto.getRandomValues = mock(() => { throw new Error('Not supported') }) } },
    ])(
      'should $name',
      ({ setup }) => {
        setup()

        const vBeforeMs = Date.now()
        const result = UUID_V7()
        const vAfterMs = Date.now()

        expect(result).toMatch(kUuidV7Regex)
        expect(getTimestampMs(result)).toBeGreaterThanOrEqual(vBeforeMs)
        expect(getTimestampMs(result)).toBeLessThanOrEqual(vAfterMs)
      }
    )
  }
)
