import { describe, expect, it } from 'bun:test'
import { AppSort } from '../ts/app-sort.js'

describe(
  'AppSort',
  () => {
    it(
      'default constructor creates instance with empty column',
      () => {
        const sort = new AppSort()
        expect(sort.column).toBe('')
      }
    )

    it(
      'constructor with undefined argument',
      () => {
        const sort = new AppSort(undefined)
        expect(sort.column).toBe('')
      }
    )

    it(
      'assigns column and asc order',
      () => {
        const sort = new AppSort({ column: 'name', order: 'asc' })
        expect(sort.column).toBe('name')
        expect(sort.order).toBe('asc')
      }
    )

    it(
      'assigns desc order',
      () => {
        const sort = new AppSort({ column: 'created_at', order: 'desc' })
        expect(sort.order).toBe('desc')
      }
    )

    it(
      'assigns empty string order',
      () => {
        const sort = new AppSort({ column: 'id', order: '' })
        expect(sort.order).toBe('')
      }
    )

    it(
      'assigns bDisabled',
      () => {
        const sort = new AppSort({ column: 'id', bDisabled: true })
        expect(sort.bDisabled).toBe(true)
      }
    )
  }
)
