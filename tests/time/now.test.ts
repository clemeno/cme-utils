import { describe, expect, it } from 'bun:test'
import { NOW } from '../../ts/time/now.util.js'
import { MockDateTime } from '../mocks/luxon-mock.js'

describe(
  'NOW',
  () => {
    it(
      'should return current date',
      () => {
        const result = NOW(MockDateTime)
        expect(result).toBeInstanceOf(Date)
      }
    )
  }
)
