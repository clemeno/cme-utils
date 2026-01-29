import { describe, expect, it } from 'bun:test'
import { GET_UPLOADED_LIGHT_PNG_FROM_UUID } from '../../ts/string/get-uploaded-light-png-from-uuid.util.js'

describe(
  'GET_UPLOADED_LIGHT_PNG_FROM_UUID',
  () => {
    it(
      'should return uploaded light PNG path',
      () => {
        const result = GET_UPLOADED_LIGHT_PNG_FROM_UUID({
          uuid: '123',
          fileUploadFolder: '/uploads',
        })
        expect(result).toBe('/uploads/123.png')
      }
    )
  }
)
