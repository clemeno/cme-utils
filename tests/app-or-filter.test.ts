import { describe, expect, it } from 'bun:test'
import { AppFilter } from '../ts/app-filter.js'
import { AppOrFilter } from '../ts/app-or-filter.js'

describe(
  'AppOrFilter',
  () => {
    it(
      'assigns empty or array',
      () => {
        const orf = new AppOrFilter({ or: [] })
        expect(orf.or).toEqual([])
      }
    )

    it(
      'assigns or array of AppFilter instances',
      () => {
        const f1 = new AppFilter({ column: 'city', operator: '=', value: 'Paris' })
        const f2 = new AppFilter({ column: 'city', operator: '=', value: 'Lyon' })
        const orf = new AppOrFilter({ or: [f1, f2] })
        expect(orf.or).toHaveLength(2)
        expect(orf.or[0].value).toBe('Paris')
        expect(orf.or[1].value).toBe('Lyon')
      }
    )

    it(
      'default or is empty array when not provided',
      () => {
        const orf = new AppOrFilter({})
        expect(Array.isArray(orf.or)).toBe(true)
        expect(orf.or).toHaveLength(0)
      }
    )
  }
)
