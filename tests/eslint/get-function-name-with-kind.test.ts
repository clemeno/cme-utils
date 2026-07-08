import { describe, expect, it } from 'bun:test'
import { GET_FUNCTION_NAME_WITH_KIND } from '../../ts/eslint/get-function-name-with-kind.util.js'
import { GET_PROPERTY_NAME } from '../../ts/eslint/get-property-name.util.js'

describe(
  'GET_FUNCTION_NAME_WITH_KIND',
  () => {
    it(
      'names a function declaration',
      () => {
        const node: any = { type: 'FunctionDeclaration', id: { name: 'foo' }, parent: { type: 'Program' } }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("function 'foo'")
      }
    )

    it(
      'labels an anonymous function',
      () => {
        const node: any = { type: 'FunctionExpression', parent: { type: 'CallExpression' } }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe('function')
      }
    )

    it(
      'labels an arrow function bound to a variable',
      () => {
        const node: any = { type: 'ArrowFunctionExpression' }
        node.parent = { type: 'VariableDeclarator', id: { type: 'Identifier', name: 'bar' }, init: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("arrow function 'bar'")
      }
    )

    it(
      'marks async and generator modifiers',
      () => {
        const node: any = { type: 'FunctionDeclaration', async: true, generator: true, id: { name: 'baz' }, parent: { type: 'Program' } }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("async generator function 'baz'")
      }
    )

    it(
      'describes an object method',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'Property', kind: 'init', computed: false, key: { type: 'Identifier', name: 'run' }, value: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("method 'run'")
      }
    )

    it(
      'describes a static private class method',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'MethodDefinition', kind: 'method', static: true, computed: false, key: { type: 'PrivateIdentifier', name: 'secret' }, value: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe('static private method #secret')
      }
    )

    it(
      'returns "constructor" for a class constructor',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'MethodDefinition', kind: 'constructor', computed: false, key: { type: 'Identifier', name: 'constructor' }, value: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe('constructor')
      }
    )

    it(
      'labels a getter and a setter',
      () => {
        const getter: any = { type: 'FunctionExpression' }
        getter.parent = { type: 'MethodDefinition', kind: 'get', computed: false, key: { type: 'Identifier', name: 'size' }, value: getter }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node: getter })).toBe("getter 'size'")

        const setter: any = { type: 'FunctionExpression' }
        setter.parent = { type: 'MethodDefinition', kind: 'set', computed: false, key: { type: 'Identifier', name: 'size' }, value: setter }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node: setter })).toBe("setter 'size'")
      }
    )

    it(
      'resolves a literal computed key',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'MethodDefinition', kind: 'method', computed: true, key: { type: 'Literal', value: 'dynamic' }, value: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("method 'dynamic'")
      }
    )

    it(
      'falls back to sourceCode text for a non-literal computed key',
      () => {
        const node: any = { type: 'FunctionExpression' }
        const key = { type: 'Identifier', name: 'KEY' }
        node.parent = { type: 'MethodDefinition', kind: 'method', computed: true, key, value: node }
        const sourceCode: any = { getText: (n: any) => (n === key ? 'KEY' : '') }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node, sourceCode })).toBe('method [KEY]')
      }
    )

    it(
      'omits the name of a non-literal computed key without sourceCode',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'MethodDefinition', kind: 'method', computed: true, key: { type: 'Identifier', name: 'KEY' }, value: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe('method')
      }
    )

    it(
      'describes a class field method',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'PropertyDefinition', computed: false, static: false, key: { type: 'Identifier', name: 'field' }, value: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("method 'field'")
      }
    )

    it(
      'names a function assigned via an assignment expression',
      () => {
        const node: any = { type: 'FunctionExpression' }
        node.parent = { type: 'AssignmentExpression', left: { type: 'Identifier', name: 'handler' }, right: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("function 'handler'")
      }
    )

    it(
      'names a function used as a default parameter (assignment pattern)',
      () => {
        const node: any = { type: 'ArrowFunctionExpression' }
        node.parent = { type: 'AssignmentPattern', left: { type: 'Identifier', name: 'cb' }, right: node }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node })).toBe("arrow function 'cb'")
      }
    )

    it(
      'skips a multi-line computed key even with sourceCode',
      () => {
        const node: any = { type: 'FunctionExpression' }
        const key = { type: 'Identifier', name: 'K' }
        node.parent = { type: 'MethodDefinition', kind: 'method', computed: true, key, value: node }
        const sourceCode: any = { getText: () => 'a +\nb' }
        expect(GET_FUNCTION_NAME_WITH_KIND({ node, sourceCode })).toBe('method')
      }
    )
  }
)

describe(
  'GET_PROPERTY_NAME',
  () => {
    it(
      'reads a plain member property',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'MemberExpression', computed: false, property: { type: 'Identifier', name: 'x' } })).toBe('x')
      }
    )

    it(
      'reads a literal computed member property',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'MemberExpression', computed: true, property: { type: 'Literal', value: 'y' } })).toBe('y')
      }
    )

    it(
      'returns null for a non-literal computed member property',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'MemberExpression', computed: true, property: { type: 'Identifier', name: 'z' } })).toBeNull()
      }
    )

    it(
      'returns null for a private identifier key',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'Property', computed: false, key: { type: 'PrivateIdentifier', name: 'p' } })).toBeNull()
      }
    )

    it(
      'returns null for a private identifier member property',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'MemberExpression', computed: false, property: { type: 'PrivateIdentifier', name: 'p' } })).toBeNull()
      }
    )

    it(
      'reads a non-computed literal key',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'Property', computed: false, key: { type: 'Literal', value: 'lit' } })).toBe('lit')
      }
    )

    it(
      'returns null for an unhandled node type',
      () => {
        expect(GET_PROPERTY_NAME({ type: 'CallExpression' })).toBeNull()
      }
    )
  }
)
