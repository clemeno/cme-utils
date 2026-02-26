import { describe, expect, it } from 'bun:test'
import { AppFilter } from '../ts/app-filter.js'

describe(
  'AppFilter',
  () => {
    it(
      'assigns column and operator',
      () => {
        const f = new AppFilter({ column: 'name', operator: '=' })
        expect(f.column).toBe('name')
        expect(f.operator).toBe('=')
      }
    )

    it(
      'assigns value',
      () => {
        const f = new AppFilter({ column: 'age', operator: '>', value: 18 })
        expect(f.value).toBe(18)
      }
    )

    it(
      'assigns options with bDbSideToHex',
      () => {
        const f = new AppFilter({ column: 'csn', operator: '=', value: '123', options: { bDbSideToHex: 1 } })
        expect(f.options?.bDbSideToHex).toBe(1)
      }
    )

    it(
      'default column and operator are empty strings',
      () => {
        const f = new AppFilter({ column: '' })
        expect(f.column).toBe('')
        expect(f.operator).toBe('')
      }
    )

    it(
      'value is undefined when not provided',
      () => {
        const f = new AppFilter({ column: 'id', operator: '=' })
        expect(f.value).toBeUndefined()
      }
    )
  }
)
