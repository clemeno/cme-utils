import type { EsNode } from './es-node-type.js'

/**
 * Get the property name from a MemberExpression, Property, MethodDefinition or
 * PropertyDefinition node.
 * Ported from eslint-utils so this library stays dependency-free.
 * @param node - The AST node to read
 * @returns The property name, or null when it cannot be resolved
 * @example
 * ```typescript
 * GET_PROPERTY_NAME({ type: 'Property', computed: false, key: { type: 'Identifier', name: 'run' } }) // returns 'run'
 * GET_PROPERTY_NAME({ type: 'MemberExpression', computed: true, property: { type: 'Literal', value: 'a-b' } }) // returns 'a-b'
 * // a computed non-literal key cannot be resolved
 * GET_PROPERTY_NAME({ type: 'Property', computed: true, key: { type: 'Identifier', name: 'KEY' } }) // returns null
 * GET_PROPERTY_NAME({ type: 'Identifier', name: 'x' }) // returns null
 * ```
 */
export function GET_PROPERTY_NAME (node: EsNode): string | null {
  let result: string | null = null

  if (node.type === 'MemberExpression') {
    const property = node.property
    if (node.computed === true) {
      // ponytail: literal computed keys only; full constant-folding (getStaticValue) dropped to stay zero-dep. Restore the port if computed constant-expression keys matter.
      result = property?.type === 'Literal' ? String(property.value) : null
    } else if (property?.type === 'PrivateIdentifier') {
      result = null
    } else {
      result = property?.name ?? null
    }
  } else if (
    node.type === 'Property' ||
    node.type === 'MethodDefinition' ||
    node.type === 'PropertyDefinition'
  ) {
    const key = node.key
    if (node.computed === true) {
      result = key?.type === 'Literal' ? String(key.value) : null
    } else if (key?.type === 'Literal') {
      result = String(key.value)
    } else if (key?.type === 'PrivateIdentifier') {
      result = null
    } else {
      result = key?.name ?? null
    }
  }

  return result
}
