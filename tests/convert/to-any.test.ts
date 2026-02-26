import { describe, expect, it } from 'bun:test'
import { TO_ANY } from '../../ts/convert/to-any.util.js'

describe(
  'TO_ANY',
  () => {
    it('returns empty string for undefined', () => {
      expect(TO_ANY(undefined)).toBe('')
    })

    it('returns empty string for empty string', () => {
      expect(TO_ANY('')).toBe('')
    })

    it('parses a JSON number', () => {
      expect(TO_ANY('42')).toBe(42)
    })

    it('parses a JSON string', () => {
      expect(TO_ANY('"hello"')).toBe('hello')
    })

    it('parses a JSON array', () => {
      expect(TO_ANY('[1,2,3]')).toEqual([1, 2, 3])
    })

    it('parses a JSON object', () => {
      expect(TO_ANY('{"a":1,"b":"x"}')).toEqual({ a: 1, b: 'x' })
    })

    it('parses JSON boolean true', () => {
      expect(TO_ANY('true')).toBe(true)
    })

    it('parses JSON boolean false', () => {
      expect(TO_ANY('false')).toBe(false)
    })

    it('parses JSON null', () => {
      expect(TO_ANY('null')).toBeNull()
    })

    it('returns empty string for invalid JSON', () => {
      expect(TO_ANY('not valid json')).toBe('')
    })
  }
)
