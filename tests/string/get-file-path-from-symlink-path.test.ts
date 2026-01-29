import { describe, expect, it } from 'bun:test'
import { GET_FILE_PATH_FROM_SYMLINK_PATH } from '../../ts/string/get-file-path-from-symlink-path.util.js'

describe(
  'GET_FILE_PATH_FROM_SYMLINK_PATH',
  () => {
    it(
      'should convert symlink path to file path',
      () => {
        const result = GET_FILE_PATH_FROM_SYMLINK_PATH({
          symlinkPath: '/static/file.png',
          publicStaticImageFolder: '/static',
          fileUploadFolder: '/uploads',
        })
        expect(result).toBe('/uploads/file.png')
      }
    )
  }
)
