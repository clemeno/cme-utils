import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID } from './get-cloudfront-light-link-from-uuid.util.js'
import { GET_CLOUDFRONT_LINK_PATH } from './get-cloudfront-link-path.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/**
 * * provide basename -> import { basename } from 'node:path'
 * @returns {string} (path|url)?`filename` -> /opt/cme/svd/www/svd/public_html/static/`filename`
 */
export const GET_UPLOADED_FILE_LINK_FROM_ANY_STRING = <TypeofBasename = any> (_: {
  basename: TypeofBasename
  s: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const basename: any = _.basename

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_CLOUDFRONT_LIGHT_LINK_FROM_UUID({ uuid, publicStaticImageFolder }) },
    { if: () => s.includes(fileUploadFolder), then: () => GET_CLOUDFRONT_LINK_PATH({ filename: basename(s), publicStaticImageFolder }) },
    { if: () => s.includes(publicStaticImageFolder), then: () => s },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_CLOUDFRONT_LINK_PATH({ filename, publicStaticImageFolder }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_CLOUDFRONT_LINK_PATH({ filename: s, publicStaticImageFolder })
}
