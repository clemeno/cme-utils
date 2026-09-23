import { describe, expect, it } from 'bun:test'
import { IS_A_DOT_PNG } from '../../ts/string/is-a-dot-png.util.js'

describe(
  'IS_A_DOT_PNG',
  () => {
    it.each<{ name: string, input: string, expected: boolean }>([
      { name: 'lowercase .png file → true', input: 'image.png', expected: true },
      { name: 'uppercase .PNG file → true', input: 'file.PNG', expected: true },
      { name: '.png file in a path → true', input: 'path/to/image.png', expected: true },
      { name: '.jpg file → false', input: 'image.jpg', expected: false },
      { name: 'png without a dot → false', input: 'png', expected: false },
      { name: '.png not at the end → false', input: 'image.png.jpg', expected: false },
      { name: 'empty string → false', input: '', expected: false },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(IS_A_DOT_PNG(input)).toBe(expected)
      }
    )
  }
)
