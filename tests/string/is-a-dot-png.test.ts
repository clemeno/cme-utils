import { describe, expect, it } from 'bun:test'
import { IS_A_DOT_PNG } from '../../ts/string/is-a-dot-png.util.js'

describe(
  'IS_A_DOT_PNG',
  () => {
    it(
      'should return true for .png files',
      () => {
        expect(IS_A_DOT_PNG('image.png')).toBe(true)
        expect(IS_A_DOT_PNG('file.PNG')).toBe(true)
        expect(IS_A_DOT_PNG('path/to/image.png')).toBe(true)
      }
    )

    it(
      'should return false for non-png files',
      () => {
        expect(IS_A_DOT_PNG('image.jpg')).toBe(false)
        expect(IS_A_DOT_PNG('png')).toBe(false)
        expect(IS_A_DOT_PNG('image.png.jpg')).toBe(false)
        expect(IS_A_DOT_PNG('')).toBe(false)
      }
    )
  }
)
