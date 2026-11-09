import type { GetFunctionNameWithKindParams } from './get-function-name-with-kind-params.js'
import { GET_PROPERTY_NAME } from './get-property-name.util.js'

/**
 * Get the name and kind of the given function node (e.g. "async method 'foo'").
 * Ported from eslint-utils so this library stays dependency-free.
 * @param _ - The function node to describe, plus an optional ESLint source code used to render computed property keys
 * @param _.node - The function AST node, linked to its `parent`
 * @param _.sourceCode - The ESLint source code, used to render a computed non-literal key as `[text]`
 * @returns The name and kind of the function node
 * @example
 * ```typescript
 * GET_FUNCTION_NAME_WITH_KIND({ node: { type: 'FunctionDeclaration', id: { name: 'foo' }, parent: { type: 'Program' } } }) // returns "function 'foo'"
 * GET_FUNCTION_NAME_WITH_KIND({ node: { type: 'FunctionDeclaration', async: true, generator: true, id: { name: 'baz' }, parent: { type: 'Program' } } }) // returns "async generator function 'baz'"
 * // an anonymous function has no name
 * GET_FUNCTION_NAME_WITH_KIND({ node: { type: 'FunctionExpression', parent: { type: 'CallExpression' } } }) // returns 'function'
 * ```
 */
export function GET_FUNCTION_NAME_WITH_KIND (_: GetFunctionNameWithKindParams): string {
  const parent = _.node.parent
  const tokens: string[] = []
  const isObjectMethod = parent.type === 'Property' && parent.value === _.node
  const isClassMethod = parent.type === 'MethodDefinition' && parent.value === _.node
  const isClassFieldMethod = parent.type === 'PropertyDefinition' && parent.value === _.node
  const isMethodLike = isObjectMethod || isClassMethod
  const isNamedByParentKey = isObjectMethod || isClassMethod || isClassFieldMethod
  const isConstructor = isMethodLike && parent.kind === 'constructor'

  if (isConstructor) {
    tokens.push('constructor')
  } else {
    // Modifiers.
    if ((isClassMethod || isClassFieldMethod) && parent.static === true) {
      tokens.push('static')
    }
    if ((isClassMethod || isClassFieldMethod) && parent.key?.type === 'PrivateIdentifier') {
      tokens.push('private')
    }
    if (_.node.async === true) {
      tokens.push('async')
    }
    if (_.node.generator === true) {
      tokens.push('generator')
    }

    // Kinds.
    if (isMethodLike) {
      if (parent.kind === 'get') {
        tokens.push('getter')
      } else if (parent.kind === 'set') {
        tokens.push('setter')
      } else {
        tokens.push('method')
      }
    } else if (isClassFieldMethod) {
      tokens.push('method')
    } else {
      if (_.node.type === 'ArrowFunctionExpression') {
        tokens.push('arrow')
      }
      tokens.push('function')
    }

    // Names.
    if (isNamedByParentKey) {
      if (parent.key?.type === 'PrivateIdentifier') {
        tokens.push(`#${parent.key.name ?? ''}`)
      } else {
        const name = GET_PROPERTY_NAME(parent)
        if (name !== null && name !== '') {
          tokens.push(`'${name}'`)
        } else if (_.sourceCode != null && parent.key != null) {
          const keyText = _.sourceCode.getText(parent.key)
          if (!keyText.includes('\n')) {
            tokens.push(`[${keyText}]`)
          }
        }
      }
    } else if (_.node.id != null) {
      tokens.push(`'${_.node.id.name ?? ''}'`)
    } else if (
      parent.type === 'VariableDeclarator' &&
      parent.id?.type === 'Identifier'
    ) {
      tokens.push(`'${parent.id.name ?? ''}'`)
    } else if (
      (parent.type === 'AssignmentExpression' || parent.type === 'AssignmentPattern') &&
      parent.left?.type === 'Identifier'
    ) {
      tokens.push(`'${parent.left.name ?? ''}'`)
    }
  }

  return tokens.join(' ')
}
