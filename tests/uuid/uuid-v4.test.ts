import { afterEach, describe, expect, it, mock } from 'bun:test'
import { UUID_V4 } from '../../ts/uuid/uuid-v4.util.js'

describe(
  'UUID_V4',
  () => {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    const originalRandomUUID = crypto.randomUUID
    const originalGetRandomValues = crypto.getRandomValues

    // restore even when an assertion fails, so a broken case can't leak mocks into other tests
    afterEach(() => {
      crypto.randomUUID = originalRandomUUID
      crypto.getRandomValues = originalGetRandomValues
    })

    const notSupported = (): never => {
      throw new Error('Not supported')
    }

    const testCases: Array<{ name: string, setup: () => void }> = [
      { name: 'generate a valid UUID v4 with crypto.randomUUID', setup: () => {} },
      { name: 'fallback to getRandomValues when randomUUID fails', setup: () => { crypto.randomUUID = mock(notSupported) } },
      { name: 'fallback to Math.random when getRandomValues fails', setup: () => { crypto.randomUUID = mock(notSupported); crypto.getRandomValues = mock(notSupported) } },
    ]

    it.each(testCases)(
      'should $name',
      ({ setup }) => {
        setup()
        expect(UUID_V4()).toMatch(uuidV4Regex)
      }
    )
  }
)
