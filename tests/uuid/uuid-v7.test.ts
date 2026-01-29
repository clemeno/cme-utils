import { describe, expect, it, mock } from 'bun:test'
import { UUID_V7 } from '../../ts/uuid/uuid-v7.util.js'

describe(
  'UUID_V7',
  () => {
    it(
      'should generate a valid UUID v7',
      () => {
        const result = UUID_V7()
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      }
    )

    it(
      'should fallback to Math.random when getRandomValues fails',
      () => {
        const originalGetRandomValues = crypto.getRandomValues
        crypto.getRandomValues = mock(() => { throw new Error('Not supported') })

        const result = UUID_V7()
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

        crypto.getRandomValues = originalGetRandomValues
      }
    )
  }
)
