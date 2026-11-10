import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { UUID_V4 } from '../../ts/uuid/uuid-v4.util.js'

describe(
  'UUID_V4',
  () => {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    const originalRandomUUID = crypto.randomUUID

    // restore even when an assertion fails, so a broken case can't leak stubs into other tests
    afterEach(() => {
      crypto.randomUUID = originalRandomUUID
      mock.restore()
    })

    /** Fills the array with its own indexes: 0, 1, 2... */
    function getRandomValues (array: Uint8Array): Uint8Array {
      array.set([...array.keys()])
      return array
    }

    it(
      'should draw its bytes from the injected getRandomValues first',
      () => {
        expect(UUID_V4({ getRandomValues })).toBe('00010203-0405-4607-8809-0a0b0c0d0e0f')
      }
    )

    const globalCases: Array<{ name: string, setup: () => void, source: 'randomUUID' | 'getRandomValues' }> = [
      { name: 'use crypto.randomUUID when nothing is injected', setup: () => {}, source: 'randomUUID' },
      { name: 'fall back to crypto.getRandomValues without crypto.randomUUID', setup: () => { Object.assign(crypto, { randomUUID: undefined }) }, source: 'getRandomValues' },
    ]

    it.each(globalCases)(
      'should $name',
      ({ setup, source }) => {
        setup()
        const sourceSpy = spyOn(crypto, source)
        expect(UUID_V4()).toMatch(uuidV4Regex)
        expect(sourceSpy).toHaveBeenCalledTimes(1)
      }
    )
  }
)
