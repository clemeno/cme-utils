import { basename } from 'node:path'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { EXTRACT_UUID_FROM_STRING } from './extract-uuid-from-string.util.js'
import { GET_UPLOADED_FILE_PATH } from './get-uploaded-file-path.util.js'
import { GET_UPLOADED_LIGHT_PNG_FROM_UUID } from './get-uploaded-light-png-from-uuid.util.js'
import { IS_A_URL } from './is-a-url.util.js'

/** @returns {string} (path|url)?`filename` -> ./uploads/`filename` */
export const GET_UPLOADED_FILE_FROM_ANY_STRING = (_: {
  s: string
  fileUploadFolder: string
  publicStaticImageFolder: string
}): string => {
  const s = _.s

  const uuid = EXTRACT_UUID_FROM_STRING(s)

  const fileUploadFolder = _.fileUploadFolder
  const publicStaticImageFolder = _.publicStaticImageFolder

  const strategyList = [
    { if: () => IS_A_STRING_AND_NOT_EMPTY(uuid), then: () => GET_UPLOADED_LIGHT_PNG_FROM_UUID({ uuid, fileUploadFolder }) },
    { if: () => s.includes(fileUploadFolder), then: () => s },
    { if: () => s.includes(publicStaticImageFolder), then: () => GET_UPLOADED_FILE_PATH({ filename: basename(s), fileUploadFolder }) },
    {
      if: () => IS_A_URL(s),
      then: () => {
        const pathList = (new URL(s)).pathname.split('/')
        const filename = pathList[pathList.length - 1]
        return IS_SET(filename) ? GET_UPLOADED_FILE_PATH({ filename, fileUploadFolder }) : ''
      },
    },
  ]

  return strategyList.find(_s => _s.if())?.then() ?? GET_UPLOADED_FILE_PATH({ filename: s, fileUploadFolder })
}
