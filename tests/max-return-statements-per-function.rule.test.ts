import { describe, expect, it } from 'bun:test'
import {
  MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE,
} from '../ts/max-return-statements-per-function.rule.js'

describe(
  'MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE',
  () => {
    it.each<{ name: string, select: (inRule: typeof MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE) => unknown, expected: unknown }>([
      {
        name: 'is exported',
        select: inRule => inRule,
        expected: { meta: expect.any(Object), create: expect.any(Function) },
      },
      {
        name: 'meta.type is "suggestion"',
        select: inRule => inRule.meta.type,
        expected: 'suggestion',
      },
      {
        name: 'meta.docs is defined',
        select: inRule => inRule.meta.docs,
        expected: {
          description: 'enforce a maximum number of return statements allowed in function blocks',
          recommended: false,
          url: 'https://github.com/tomyam2020/eslint-plugin-max-return-statements-per-function/blob/main/README.md',
        },
      },
      {
        name: 'meta.messages.exceed is defined',
        select: inRule => inRule.meta.messages,
        expected: { exceed: '{{ name }} has too many return statements ({{ count }}). Maximum allowed is {{ max }}.' },
      },
      {
        name: 'meta.schema has one integer option with minimum 0',
        select: inRule => inRule.meta.schema,
        expected: [{ type: 'integer', minimum: 0, default: 1 }],
      },
      {
        name: 'create returns an object with function lifecycle hooks',
        select: inRule => inRule.create({ options: [2], report: () => undefined }),
        expected: {
          FunctionDeclaration: expect.any(Function),
          FunctionExpression: expect.any(Function),
          ArrowFunctionExpression: expect.any(Function),
          StaticBlock: expect.any(Function),
          ReturnStatement: expect.any(Function),
          'FunctionDeclaration:exit': expect.any(Function),
          'FunctionExpression:exit': expect.any(Function),
          'ArrowFunctionExpression:exit': expect.any(Function),
          'StaticBlock:exit': expect.any(Function),
        },
      },
    ])(
      '$name',
      ({ select, expected }) => {
        expect(select(MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE)).toEqual(expected)
      }
    )

    it.each<{ name: string, options: number[], mockNode: { type: string, parent?: { type: string } }, returnCount: number, expected: Array<{ messageId: string, data: { name: string, count: number, max: number } }> }>([
      {
        name: 'no report when return count is within max',
        options: [2],
        mockNode: { type: 'FunctionDeclaration', parent: { type: 'Program' } },
        returnCount: 2,
        expected: [],
      },
      {
        name: 'reports when return count exceeds max',
        options: [1],
        mockNode: { type: 'FunctionDeclaration', parent: { type: 'Program' } },
        returnCount: 2,
        expected: [{ messageId: 'exceed', data: { name: 'Function', count: 2, max: 1 } }],
      },
      {
        name: 'StaticBlock does not trigger a report even when over max',
        options: [0],
        mockNode: { type: 'StaticBlock' },
        returnCount: 1,
        expected: [],
      },
      {
        name: 'uses default max of 1 when options is empty',
        options: [],
        mockNode: { type: 'ArrowFunctionExpression', parent: { type: 'Program' } },
        returnCount: 2,
        expected: [{ messageId: 'exceed', data: { name: 'Arrow function', count: 2, max: 1 } }],
      },
    ])(
      '$name',
      ({ options, mockNode, returnCount, expected }) => {
        const reports: any[] = []
        const mockContext: any = {
          options,
          report: (info: any) => reports.push(info),
        }
        const hooks = MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE.create(mockContext)
        hooks[mockNode.type](mockNode)
        Array.from({ length: returnCount }).forEach(() => hooks.ReturnStatement(undefined))
        hooks[`${mockNode.type}:exit`](mockNode)
        expect(reports).toEqual(expected.map(inReport => ({ node: mockNode, ...inReport })))
      }
    )
  }
)
