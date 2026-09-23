import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_URL_FILE } from '../../ts/string/get-cloudfront-url-file.util.js'

describe(
  'GET_CLOUDFRONT_URL_FILE',
  () => {
    it.each<{ name: string, input: Parameters<typeof GET_CLOUDFRONT_URL_FILE>[0], expected: string }>([
      { name: 'should return the URL with filename, adding the slash if missing', input: { filename: 'image.png', cloudfrontUri: 'https://subdomain.cloudfront.com' }, expected: 'https://subdomain.cloudfront.com/image.png' },
      { name: 'should not add extra slash if present', input: { filename: 'image.png', cloudfrontUri: 'https://subdomain.cloudfront.com/' }, expected: 'https://subdomain.cloudfront.com/image.png' },
      { name: 'should keep a nested filename path as is', input: { filename: 'dir/sub/image.png', cloudfrontUri: 'https://subdomain.cloudfront.com' }, expected: 'https://subdomain.cloudfront.com/dir/sub/image.png' },
      { name: 'should return the uri with a trailing slash for an empty filename', input: { filename: '', cloudfrontUri: 'https://subdomain.cloudfront.com' }, expected: 'https://subdomain.cloudfront.com/' },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(GET_CLOUDFRONT_URL_FILE(input)).toBe(expected)
      }
    )
  }
)
