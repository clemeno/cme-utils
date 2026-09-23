import { describe, expect, it } from 'bun:test'
import { AppOption } from '../ts/app-option.js'

describe(
  'AppOption',
  () => {
    it.each<{ name: string, build: () => AppOption<unknown>, expected: AppOption<unknown> }>([
      { name: 'default constructor creates instance with empty value and label', build: () => new AppOption(), expected: { value: '', label: '' } },
      { name: 'constructor with undefined argument', build: () => new AppOption(undefined), expected: { value: '', label: '' } },
      { name: 'assigns number value and label only', build: () => new AppOption({ value: 1, label: 'One' }), expected: { value: 1, label: 'One' } },
      {
        name: 'assigns optional boolean flags',
        build: () => new AppOption({ value: 2, label: 'Two', bDisabled: true, bSelected: false, bHidden: true, bReadonly: false }),
        expected: { value: 2, label: 'Two', bDisabled: true, bSelected: false, bHidden: true, bReadonly: false },
      },
      { name: 'assigns key', build: () => new AppOption({ value: 3, label: 'Three', key: 'three' }), expected: { value: 3, label: 'Three', key: 'three' } },
      { name: 'assigns typed string value', build: () => new AppOption<string>({ value: 'hello', label: 'Hello' }), expected: { value: 'hello', label: 'Hello' } },
    ])(
      '$name',
      ({ build, expected }) => {
        expect(build()).toEqual(expected)
      }
    )
  }
)
