import { describe, expect, it } from 'bun:test'
import { UUID_V7_TO_TIMESTAMP_MS } from '../../ts/uuid/uuid-v7-to-timestamp-ms.util.ts'

describe(
  'UUID_V7_TO_TIMESTAMP_MS',
  () => {
    it(
      'should extract timestamp from UUID v7',
      () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000'
        const result = UUID_V7_TO_TIMESTAMP_MS(uuid)
        expect(typeof result).toBe('number')
      }
    )
  }
)
