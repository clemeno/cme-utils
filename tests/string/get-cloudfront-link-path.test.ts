import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_LINK_PATH } from '../../ts/string/get-cloudfront-link-path.util.js'

describe(
  'GET_CLOUDFRONT_LINK_PATH',
  () => {
    const testCases = [
      { name: 'should return the path with filename', input: { filename: 'image.png', publicStaticImageFolder: '/opt/cme' }, expected: '/opt/cme/image.png' },
      { name: 'should add slash if missing', input: { filename: 'image.png', publicStaticImageFolder: '/opt/cme' }, expected: '/opt/cme/image.png' },
      { name: 'should not add extra slash if present', input: { filename: 'image.png', publicStaticImageFolder: '/opt/cme/' }, expected: '/opt/cme/image.png' },
    ]

    it.each(testCases)(
      '$name',
      ({ name, input, expected }) => {
        expect(GET_CLOUDFRONT_LINK_PATH(input)).toBe(expected)
      }
    )
  }
)
