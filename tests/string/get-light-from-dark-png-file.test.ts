import { describe, expect, it } from 'bun:test'
import { GET_LIGHT_FROM_DARK_PNG_FILE } from '../../ts/string/get-light-from-dark-png-file.util.js'

describe(
  'GET_LIGHT_FROM_DARK_PNG_FILE',
  () => {
    it(
      'should convert dark PNG to light PNG',
      () => {
        const result = GET_LIGHT_FROM_DARK_PNG_FILE('image_dark.png')
        expect(result).toBe('image.png')
      }
    )
  }
)
