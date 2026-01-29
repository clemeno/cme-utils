import { describe, expect, it } from 'bun:test'
import { GET_CLOUDFRONT_DARK_LINK_FROM_UUID } from '../../ts/string/get-cloudfront-dark-link-from-uuid.util.js'

describe(
  'GET_CLOUDFRONT_DARK_LINK_FROM_UUID',
  () => {
    it(
      'should return the path with dark png filename',
      () => {
        const result = GET_CLOUDFRONT_DARK_LINK_FROM_UUID({ uuid: '123', publicStaticImageFolder: '/opt' })
        expect(result).toBe('/opt/123_dark.png')
      }
    )
  }
)
