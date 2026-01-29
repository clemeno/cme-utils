import { describe, expect, it } from 'bun:test'
import { GET_UPLOADED_FILE_PATH } from '../../ts/string/get-uploaded-file-path.util.js'

describe(
  'GET_UPLOADED_FILE_PATH',
  () => {
    it(
      'should return uploaded file path',
      () => {
        const result = GET_UPLOADED_FILE_PATH({
          filename: 'file.png',
          fileUploadFolder: '/uploads',
        })
        expect(result).toBe('/uploads/file.png')
      }
    )
  }
)
