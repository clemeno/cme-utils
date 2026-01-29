import { describe, expect, it } from 'bun:test'
import { FROM_HEX_TO_UUID } from '../../ts/uuid/from-hex-to-uuid.util.ts'

describe(
  'FROM_HEX_TO_UUID',
  () => {
    it(
      'should convert hex to UUID',
      () => {
        const hex = '123e4567e89b12d3a456426614174000'
        const result = FROM_HEX_TO_UUID(hex)
        expect(result).toBe('123e4567-e89b-12d3-a456-426614174000')
      }
    )
  }
)
