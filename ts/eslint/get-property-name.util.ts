import type { EsNode } from './es-node-type.js'

/**
 * Get the property name from a MemberExpression, Property, MethodDefinition or
 * PropertyDefinition node.
 * Ported from eslint-utils so this library stays dependency-free.
 * @param {EsNode} node The AST node to read
 * @returns {string | null} The property name, or null when it cannot be resolved
 */
export const GET_PROPERTY_NAME = (node: EsNode): string | null => {
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
