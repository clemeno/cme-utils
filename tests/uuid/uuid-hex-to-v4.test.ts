import { describe, expect, it } from 'bun:test'
import { UUID_HEX_TO_V4 } from '../../ts/uuid/uuid-hex-to-v4.util.ts'

describe(
  'UUID_HEX_TO_V4',
  () => {
    it(
      'should convert hex to UUID v4',
      () => {
        const hex = '123e4567e89b12d3a456426614174000'
        const result = UUID_HEX_TO_V4(hex)
        expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      }
    )
  }
)
