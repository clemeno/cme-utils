import { afterEach, describe, expect, it, setSystemTime } from 'bun:test'
import { UUID_V7 } from '../../ts/uuid/uuid-v7.util.js'

describe(
  'UUID_V7',
  () => {
    const kUuidV7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i // version 7, RFC variant

    // restore even when an assertion fails, so a pinned clock can't leak into other tests
    afterEach(() => {
      setSystemTime()
    })

    /** Returns the unix ms timestamp stored in the first 48 bits of a UUID v7. */
    function getTimestampMs (inUuid: string): number {
      return Number.parseInt(inUuid.slice(0, 8) + inUuid.slice(9, 13), 16)
    }

    it(
      'should generate a valid UUID v7 from the global crypto',
      () => {
        const vBeforeMs = Date.now()
        const result = UUID_V7()
        const vAfterMs = Date.now()

        expect(result).toMatch(kUuidV7Regex)
        expect(getTimestampMs(result)).toBeGreaterThanOrEqual(vBeforeMs)
        expect(getTimestampMs(result)).toBeLessThanOrEqual(vAfterMs)
      }
    )

    /** Fills the array with its own indexes: 0, 1, 2... */
    function getRandomValues (array: Uint8Array): Uint8Array {
      array.set([...array.keys()])
      return array
    }

    it(
      'should draw its bytes from the injected getRandomValues',
      () => {
        setSystemTime(new Date('2024-03-15T14:30:45.000Z')) // 0x018e4285be08 ms
        expect(UUID_V7({ getRandomValues })).toBe('018e4285-be08-7607-8809-0a0b0c0d0e0f')
      }
    )
  }
)
