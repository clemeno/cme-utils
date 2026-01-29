import { describe, expect, it } from 'bun:test'
import { WAIT_MS } from '../../ts/time/wait-ms.util.js'

describe(
  'WAIT_MS',
  () => {
    it(
      'should wait and return true',
      async () => {
        const result = await WAIT_MS(10)
        expect(result).toBe(true)
      }
    )
  }
)
