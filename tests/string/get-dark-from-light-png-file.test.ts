import { describe, expect, it } from 'bun:test'
import { GET_DARK_FROM_LIGHT_PNG_FILE } from '../../ts/string/get-dark-from-light-png-file.util.js'

describe(
  'GET_DARK_FROM_LIGHT_PNG_FILE',
  () => {
    it(
      'should convert light PNG to dark PNG',
      () => {
        const result = GET_DARK_FROM_LIGHT_PNG_FILE('image.png')
        expect(result).toBe('image_dark.png')
      }
    )
  }
)
