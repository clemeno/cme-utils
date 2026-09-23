import { describe, expect, it } from 'bun:test'
import {
  MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN,
} from '../ts/max-return-statements-per-function.plugin.js'
import {
  MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE,
} from '../ts/max-return-statements-per-function.rule.js'

describe(
  'MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'is exported', actual: MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN, expected: { rules: { 'max-return-statements-per-function': MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE } } },
      { name: 'has a rules object', actual: MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN.rules, expected: { 'max-return-statements-per-function': MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE } },
      { name: 'contains the max-return-statements-per-function rule', actual: Object.keys(MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN.rules), expected: ['max-return-statements-per-function'] },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toStrictEqual(expected)
      }
    )

    it.each<{ name: string, getActual: () => unknown, expected: unknown }>([
      { name: 'the plugin rule is the same as the standalone rule export', getActual: () => MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN.rules['max-return-statements-per-function'], expected: MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE },
      { name: 'plugin is also the default export', getActual: async () => (await import('../ts/max-return-statements-per-function.plugin.js')).default, expected: MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN },
    ])(
      '$name',
      async ({ getActual, expected }) => {
        expect(await getActual()).toBe(expected)
      }
    )
  }
)
