import { describe, expect, it } from 'bun:test'
import { DELAY_MS } from '../../ts/time/delay-ms.util.js'

describe(
  'DELAY_MS',
  () => {
    it(
      'should delay for the specified milliseconds',
      async () => {
        const start = Date.now()
        await DELAY_MS(10)
        const end = Date.now()
        const delayMs = end - start
        expect(delayMs).toBeLessThanOrEqual(1e3)
        expect(delayMs).toBeGreaterThanOrEqual(8)
      }
    )
  }
)
