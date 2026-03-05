import { describe, expect, it } from 'bun:test'
import { AppOption } from '../ts/app-option.js'

describe(
  'AppOption',
  () => {
    it(
      'default constructor creates instance with empty label',
      () => {
        const opt = new AppOption()
        expect(opt.label).toBe('')
      }
    )

    it(
      'constructor with undefined argument',
      () => {
        const opt = new AppOption(undefined)
        expect(opt.label).toBe('')
      }
    )

    it(
      'assigns number value and label only',
      () => {
        const opt = new AppOption({ value: 1, label: 'One' })
        expect(opt.value).toBe(1)
        expect(opt.label).toBe('One')
      }
    )

    it(
      'assigns optional boolean flags',
      () => {
        const opt = new AppOption({
          value: 2,
          label: 'Two',
          bDisabled: true,
          bSelected: false,
          bHidden: true,
          bReadonly: false,
        })
        expect(opt.value).toBe(2)
        expect(opt.label).toBe('Two')
        expect(opt.bDisabled).toBe(true)
        expect(opt.bSelected).toBe(false)
        expect(opt.bHidden).toBe(true)
        expect(opt.bReadonly).toBe(false)
      }
    )

    it(
      'assigns key',
      () => {
        const opt = new AppOption({ value: 3, label: 'Three', key: 'three' })
        expect(opt.value).toBe(3)
        expect(opt.label).toBe('Three')
        expect(opt.key).toBe('three')
      }
    )

    it(
      'assigns typed string value',
      () => {
        const opt = new AppOption<string>({ value: 'hello', label: 'Hello' })
        expect(opt.value).toBe('hello')
        expect(opt.label).toBe('Hello')
      }
    )
  }
)
