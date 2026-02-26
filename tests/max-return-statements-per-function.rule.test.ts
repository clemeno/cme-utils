import { describe, expect, it } from 'bun:test'
import {
  MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE,
} from '../ts/max-return-statements-per-function.rule.js'

describe(
  'MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE',
  () => {
    it(
      'is exported',
      () => {
        expect(MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE).toBeDefined()
      }
    )

    it(
      'meta.type is "suggestion"',
      () => {
        expect(MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.meta.type).toBe('suggestion')
      }
    )

    it(
      'meta.docs.description is defined',
      () => {
        expect(typeof MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.meta.docs.description).toBe('string')
      }
    )

    it(
      'meta.messages.exceed is defined',
      () => {
        expect(typeof MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.meta.messages.exceed).toBe('string')
      }
    )

    it(
      'meta.schema has one integer option with minimum 0',
      () => {
        const schema = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.meta.schema
        expect(schema).toHaveLength(1)
        expect(schema[0].type).toBe('integer')
        expect(schema[0].minimum).toBe(0)
      }
    )

    it(
      'create returns an object with function lifecycle hooks',
      () => {
        const reports: any[] = []
        const mockContext: any = {
          options: [2],
          report: (info: any) => reports.push(info),
        }
        const hooks = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.create(mockContext)
        expect(typeof hooks.FunctionDeclaration).toBe('function')
        expect(typeof hooks.FunctionExpression).toBe('function')
        expect(typeof hooks.ArrowFunctionExpression).toBe('function')
        expect(typeof hooks.ReturnStatement).toBe('function')
        expect(typeof hooks['FunctionDeclaration:exit']).toBe('function')
        expect(typeof hooks['FunctionExpression:exit']).toBe('function')
        expect(typeof hooks['ArrowFunctionExpression:exit']).toBe('function')
      }
    )

    it(
      'no report when return count is within max',
      () => {
        const reports: any[] = []
        const mockContext: any = {
          options: [2],
          report: (info: any) => reports.push(info),
        }
        const hooks = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.create(mockContext)
        const mockNode: any = { type: 'FunctionDeclaration', parent: { type: 'Program' } }
        hooks.FunctionDeclaration(mockNode)
        hooks.ReturnStatement(undefined)
        hooks.ReturnStatement(undefined)
        hooks['FunctionDeclaration:exit'](mockNode)
        expect(reports).toHaveLength(0)
      }
    )

    it(
      'reports when return count exceeds max',
      () => {
        const reports: any[] = []
        const mockContext: any = {
          options: [1],
          report: (info: any) => reports.push(info),
        }
        const hooks = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.create(mockContext)
        const mockNode: any = { type: 'FunctionDeclaration', parent: { type: 'Program' } }
        hooks.FunctionDeclaration(mockNode)
        hooks.ReturnStatement(undefined)
        hooks.ReturnStatement(undefined)
        hooks['FunctionDeclaration:exit'](mockNode)
        expect(reports).toHaveLength(1)
        expect(reports[0].messageId).toBe('exceed')
        expect(reports[0].data.count).toBe(2)
        expect(reports[0].data.max).toBe(1)
      }
    )

    it(
      'StaticBlock does not trigger a report even when over max',
      () => {
        const reports: any[] = []
        const mockContext: any = {
          options: [0],
          report: (info: any) => reports.push(info),
        }
        const hooks = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.create(mockContext)
        const staticBlockNode: any = { type: 'StaticBlock' }
        hooks.StaticBlock(staticBlockNode)
        hooks.ReturnStatement(undefined)
        hooks['StaticBlock:exit'](staticBlockNode)
        expect(reports).toHaveLength(0)
      }
    )

    it(
      'uses default max of 1 when options is empty',
      () => {
        const reports: any[] = []
        const mockContext: any = {
          options: [],
          report: (info: any) => reports.push(info),
        }
        const hooks = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.create(mockContext)
        const mockNode: any = { type: 'ArrowFunctionExpression', parent: { type: 'Program' } }
        hooks.ArrowFunctionExpression(mockNode)
        hooks.ReturnStatement(undefined)
        hooks.ReturnStatement(undefined)
        hooks['ArrowFunctionExpression:exit'](mockNode)
        expect(reports).toHaveLength(1)
        expect(reports[0].data.max).toBe(1)
      }
    )
  }
)
