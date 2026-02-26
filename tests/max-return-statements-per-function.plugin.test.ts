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
    it(
      'is exported',
      () => {
        expect(MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN).toBeDefined()
      }
    )

    it(
      'has a rules object',
      () => {
        expect(typeof MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN.rules).toBe('object')
      }
    )

    it(
      'contains the max-return-statements-per-function rule',
      () => {
        expect(MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN.rules['max-return-statements-per-function']).toBeDefined()
      }
    )

    it(
      'the plugin rule is the same as the standalone rule export',
      () => {
        expect(MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN.rules['max-return-statements-per-function']).toBe(MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE)
      }
    )

    it(
      'plugin is also the default export',
      async () => {
        const mod = await import('../ts/max-return-statements-per-function.plugin.js')
        expect(mod.default).toBe(MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN)
      }
    )
  }
)
