import { describe, expect, it } from 'bun:test'
import { NOW_UNIX } from '../../ts/time/now-unix.util.js'

describe(
  'NOW_UNIX',
  () => {
    it(
      'should return current unix timestamp',
      () => {
        const result = NOW_UNIX()
        const now = Math.floor(Date.now() / 1000)
        expect(result).toBe(now)
      }
    )
  }
)
