import { describe, expect, it } from 'bun:test'
import { GET_SYMLINK_PATH_FROM_FILE_PATH } from '../../ts/string/get-symlink-path-from-file-path.util.js'

describe(
  'GET_SYMLINK_PATH_FROM_FILE_PATH',
  () => {
    it(
      'should convert file path to symlink path',
      () => {
        const result = GET_SYMLINK_PATH_FROM_FILE_PATH({
          filePath: '/uploads/file.png',
          fileUploadFolder: '/uploads',
          publicStaticImageFolder: '/static',
        })
        expect(result).toBe('/static/file.png')
      }
    )
  }
)
