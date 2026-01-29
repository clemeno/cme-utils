import { describe, expect, it, mock } from 'bun:test'
import { UUID_V4 } from '../../ts/uuid/uuid-v4.util.js'

describe(
  'UUID_V4',
  () => {
    const validUUIDTestCases = [
      { name: 'generate a valid UUID v4', setup: () => {}, expected: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i },
    ]

    it.each(validUUIDTestCases)(
      'should $name',
      ({ setup, expected }) => {
        setup()
        const result = UUID_V4()
        expect(result).toMatch(expected)
      }
    )

    const fallbackTestCases = [
      {
        name: 'fallback to getRandomValues when randomUUID fails',
        setup: () => {
          const originalRandomUUID = crypto.randomUUID
          crypto.randomUUID = mock(() => { throw new Error('Not supported') })
          return { originalRandomUUID }
        },
        cleanup: (context: { originalRandomUUID: any }) => {
          crypto.randomUUID = context.originalRandomUUID
        },
        expected: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      },
      {
        name: 'fallback to Math.random when getRandomValues fails',
        setup: () => {
          const originalRandomUUID = crypto.randomUUID
          const originalGetRandomValues = crypto.getRandomValues

          crypto.randomUUID = mock(() => { throw new Error('Not supported') })
          crypto.getRandomValues = mock(() => { throw new Error('Not supported') })

          return { originalRandomUUID, originalGetRandomValues }
        },
        cleanup: (context: { originalRandomUUID: any, originalGetRandomValues: any }) => {
          crypto.randomUUID = context.originalRandomUUID
          crypto.getRandomValues = context.originalGetRandomValues
        },
        expected: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      },
    ]

    it.each(fallbackTestCases)(
      'should $name',
      ({ setup, cleanup, expected }) => {
        const context = setup()
        const result = UUID_V4()
        expect(result).toMatch(expected)
        cleanup(context)
      }
    )
  }
)
