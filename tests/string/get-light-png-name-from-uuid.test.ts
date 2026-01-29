import { describe, expect, it } from 'bun:test'
import { GET_LIGHT_PNG_NAME_FROM_UUID } from '../../ts/string/get-light-png-name-from-uuid.util.js'

describe(
  'GET_LIGHT_PNG_NAME_FROM_UUID',
  () => {
    it(
      'should return uuid.png',
      () => {
        const result = GET_LIGHT_PNG_NAME_FROM_UUID('123e4567-e89b-12d3-a456-426614174000')
        expect(result).toBe('123e4567-e89b-12d3-a456-426614174000.png')
      }
    )
  }
)
