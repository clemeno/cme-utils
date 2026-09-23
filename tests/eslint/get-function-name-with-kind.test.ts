import { describe, expect, it } from 'bun:test'
import { GET_FUNCTION_NAME_WITH_KIND } from '../../ts/eslint/get-function-name-with-kind.util.js'
import { GET_PROPERTY_NAME } from '../../ts/eslint/get-property-name.util.js'
import type { EsNode } from '../../ts/eslint/es-node-type.js'

/** Builds `node` with a `parent` that points back to it through `childKey`, as ESLint links AST nodes */
function linkToParent (_: { node: Record<string, unknown>, parent: Record<string, unknown>, childKey: string }): EsNode {
  const node = { ..._.node } as unknown as EsNode
  node.parent = { ..._.parent, [_.childKey]: node } as unknown as EsNode
  return node
}

describe(
  'GET_FUNCTION_NAME_WITH_KIND',
  () => {
    const computedKey = { type: 'Identifier', name: 'KEY' }

    const testCases: Array<{ name: string, node: EsNode, sourceCode?: { getText: (node: EsNode) => string }, expected: string }> = [
      { name: 'names a function declaration', node: { type: 'FunctionDeclaration', id: { name: 'foo' }, parent: { type: 'Program' } } as unknown as EsNode, expected: "function 'foo'" },
      { name: 'labels an anonymous function', node: { type: 'FunctionExpression', parent: { type: 'CallExpression' } } as unknown as EsNode, expected: 'function' },
      { name: 'labels an arrow function bound to a variable', node: linkToParent({ node: { type: 'ArrowFunctionExpression' }, parent: { type: 'VariableDeclarator', id: { type: 'Identifier', name: 'bar' } }, childKey: 'init' }), expected: "arrow function 'bar'" },
      { name: 'marks async and generator modifiers', node: { type: 'FunctionDeclaration', async: true, generator: true, id: { name: 'baz' }, parent: { type: 'Program' } } as unknown as EsNode, expected: "async generator function 'baz'" },
      { name: 'describes an object method', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'Property', kind: 'init', computed: false, key: { type: 'Identifier', name: 'run' } }, childKey: 'value' }), expected: "method 'run'" },
      { name: 'describes a static private class method', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'method', static: true, computed: false, key: { type: 'PrivateIdentifier', name: 'secret' } }, childKey: 'value' }), expected: 'static private method #secret' },
      { name: 'returns "constructor" for a class constructor', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'constructor', computed: false, key: { type: 'Identifier', name: 'constructor' } }, childKey: 'value' }), expected: 'constructor' },
      { name: 'labels a getter', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'get', computed: false, key: { type: 'Identifier', name: 'size' } }, childKey: 'value' }), expected: "getter 'size'" },
      { name: 'labels a setter', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'set', computed: false, key: { type: 'Identifier', name: 'size' } }, childKey: 'value' }), expected: "setter 'size'" },
      { name: 'resolves a literal computed key', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'method', computed: true, key: { type: 'Literal', value: 'dynamic' } }, childKey: 'value' }), expected: "method 'dynamic'" },
      { name: 'falls back to sourceCode text for a non-literal computed key', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'method', computed: true, key: computedKey }, childKey: 'value' }), sourceCode: { getText: (n: EsNode): string => ((n as unknown) === computedKey ? 'KEY' : '') }, expected: 'method [KEY]' },
      { name: 'omits the name of a non-literal computed key without sourceCode', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'method', computed: true, key: { type: 'Identifier', name: 'KEY' } }, childKey: 'value' }), expected: 'method' },
      { name: 'skips a multi-line computed key even with sourceCode', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'MethodDefinition', kind: 'method', computed: true, key: { type: 'Identifier', name: 'K' } }, childKey: 'value' }), sourceCode: { getText: (): string => 'a +\nb' }, expected: 'method' },
      { name: 'describes a class field method', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'PropertyDefinition', computed: false, static: false, key: { type: 'Identifier', name: 'field' } }, childKey: 'value' }), expected: "method 'field'" },
      { name: 'names a function assigned via an assignment expression', node: linkToParent({ node: { type: 'FunctionExpression' }, parent: { type: 'AssignmentExpression', left: { type: 'Identifier', name: 'handler' } }, childKey: 'right' }), expected: "function 'handler'" },
      { name: 'names a function used as a default parameter (assignment pattern)', node: linkToParent({ node: { type: 'ArrowFunctionExpression' }, parent: { type: 'AssignmentPattern', left: { type: 'Identifier', name: 'cb' } }, childKey: 'right' }), expected: "arrow function 'cb'" },
    ]

    it.each(testCases)(
      '$name',
      ({ node, sourceCode, expected }) => {
        expect(GET_FUNCTION_NAME_WITH_KIND({ node, sourceCode })).toBe(expected)
      }
    )
  }
)

describe(
  'GET_PROPERTY_NAME',
  () => {
    // parent links are irrelevant to GET_PROPERTY_NAME, so nodes are partial and cast
    const testCases: Array<{ name: string, node: unknown, expected: string | null }> = [
      { name: 'reads a plain member property', node: { type: 'MemberExpression', computed: false, property: { type: 'Identifier', name: 'x' } }, expected: 'x' },
      { name: 'reads a literal computed member property', node: { type: 'MemberExpression', computed: true, property: { type: 'Literal', value: 'y' } }, expected: 'y' },
      { name: 'returns null for a non-literal computed member property', node: { type: 'MemberExpression', computed: true, property: { type: 'Identifier', name: 'z' } }, expected: null },
      { name: 'returns null for a private identifier key', node: { type: 'Property', computed: false, key: { type: 'PrivateIdentifier', name: 'p' } }, expected: null },
      { name: 'returns null for a private identifier member property', node: { type: 'MemberExpression', computed: false, property: { type: 'PrivateIdentifier', name: 'p' } }, expected: null },
      { name: 'reads a non-computed literal key', node: { type: 'Property', computed: false, key: { type: 'Literal', value: 'lit' } }, expected: 'lit' },
      { name: 'returns null for an unhandled node type', node: { type: 'CallExpression' }, expected: null },
    ]

    it.each(testCases)(
      '$name',
      ({ node, expected }) => {
        expect(GET_PROPERTY_NAME(node as EsNode)).toBe(expected)
      }
    )
  }
)
