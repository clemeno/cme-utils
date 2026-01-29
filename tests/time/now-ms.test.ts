import { describe, expect, it } from 'bun:test'
import { NOW_MS } from '../../ts/time/now-ms.util.js'

describe(
  'NOW_MS',
  () => {
    const timestampTestCases = [
      { name: 'greater than now-100', check: ({ result, now }: { result: number, now: number }) => result > now - 100 },
      { name: 'less than now+100', check: ({ result, now }: { result: number, now: number }) => result < now + 100 },
    ]

    it.each(timestampTestCases)(
      'should return current timestamp in milliseconds - $name',
      ({ check }) => {
        const result = NOW_MS()
        const now = Date.now()
        expect(check({ result, now })).toBe(true)
      }
    )
  }
)
