/**
 * @fileoverview A rule to set the maximum number of return statements in a function.
 * Based on tomyam2020's work
 * @see https://github.com/tomyam2020/eslint-plugin-max-return-statements-per-function
 */

/** @type {number} */
const DEFAULT_MAX_COUNT = 1

/**
 * Get the property name from a MemberExpression, Property, MethodDefinition or
 * PropertyDefinition node.
 * Ported from eslint-utils so this library stays dependency-free.
 * @param {any} node The AST node to read
 * @returns {string | null} The property name, or null when it cannot be resolved
 */
function getPropertyName (node) {
  let result = null

  if (node.type === 'MemberExpression') {
    if (node.computed) {
      // ponytail: literal computed keys only; full constant-folding (getStaticValue) dropped to stay zero-dep. Restore the port if computed constant-expression keys matter.
      result = node.property.type === 'Literal' ? String(node.property.value) : null
    } else if (node.property.type === 'PrivateIdentifier') {
      result = null
    } else {
      result = node.property.name
    }
  } else if (
    node.type === 'Property' ||
    node.type === 'MethodDefinition' ||
    node.type === 'PropertyDefinition'
  ) {
    if (node.computed) {
      result = node.key.type === 'Literal' ? String(node.key.value) : null
    } else if (node.key.type === 'Literal') {
      result = String(node.key.value)
    } else if (node.key.type === 'PrivateIdentifier') {
      result = null
    } else {
      result = node.key.name
    }
  }

  return result
}

/**
 * Get the name and kind of the given function node (e.g. "async method 'foo'").
 * Ported from eslint-utils so this library stays dependency-free.
 * @param {{ node: any, sourceCode?: any }} _ The function node to describe, plus an optional ESLint source code used to render computed property keys
 * @returns {string} The name and kind of the function node
 */
function getFunctionNameWithKind (_) {
  const parent = _.node.parent
  const tokens = []
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
    if ((isClassMethod || isClassFieldMethod) && parent.static) {
      tokens.push('static')
    }
    if ((isClassMethod || isClassFieldMethod) && parent.key.type === 'PrivateIdentifier') {
      tokens.push('private')
    }
    if (_.node.async) {
      tokens.push('async')
    }
    if (_.node.generator) {
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
      if (parent.key.type === 'PrivateIdentifier') {
        tokens.push(`#${parent.key.name}`)
      } else {
        const name = getPropertyName(parent)
        if (name) {
          tokens.push(`'${name}'`)
        } else if (_.sourceCode) {
          const keyText = _.sourceCode.getText(parent.key)
          if (!keyText.includes('\n')) {
            tokens.push(`[${keyText}]`)
          }
        }
      }
    } else if (_.node.id) {
      tokens.push(`'${_.node.id.name}'`)
    } else if (
      parent.type === 'VariableDeclarator' &&
      parent.id &&
      parent.id.type === 'Identifier'
    ) {
      tokens.push(`'${parent.id.name}'`)
    } else if (
      (parent.type === 'AssignmentExpression' || parent.type === 'AssignmentPattern') &&
      parent.left &&
      parent.left.type === 'Identifier'
    ) {
      tokens.push(`'${parent.left.name}'`)
    }
  }

  return tokens.join(' ')
}

/**
 * Converts the first letter of a string to uppercase.
 * @param {string} string The string to operate on
 * @returns {string} The converted string
 */
function upperCaseFirst (string) {
  return (string.length <= 1) ? string.toUpperCase() : string[0].toUpperCase() + string.slice(1)
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce a maximum number of return statements allowed in function blocks',
      recommended: false,
      url: 'https://github.com/tomyam2020/eslint-plugin-max-return-statements-per-function/blob/main/README.md',
    },
    schema: [
      {
        type: 'integer',
        minimum: 0,
        default: DEFAULT_MAX_COUNT,
      },
    ],
    messages: {
      exceed: '{{ name }} has too many return statements ({{ count }}). Maximum allowed is {{ max }}.',
    },
  },

  create (context) {
    /**
     * =====================================================================
     * Helpers
     * =====================================================================
     */

    /** @type {number[]} */
    const functionStack = []

    /** @type {number} */
    const maxReturnStatements = context.options[0] ?? DEFAULT_MAX_COUNT

    /**
     * Reports a node if it has too many statements
     * @param {import('eslint').Rule.Node} node node to evaluate
     * @param {any} count Number of statements in node
     * @param {any} max Maximum number of statements allowed
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line max-params
    function reportIfTooManyStatements (node, count, max) {
      if (count > max) {
        const name = upperCaseFirst(getFunctionNameWithKind({ node }))

        context.report({
          node,
          messageId: 'exceed',
          data: { name, count, max },
        })
      }
    }

    /**
     * When parsing a new function, store it in our function stack
     * @returns {void}
     * @private
     */
    function startFunction () {
      functionStack.push(0)
    }

    /**
     * Evaluate the node at the end of function
     * @param {import('eslint').Rule.Node} node node to evaluate
     * @returns {void}
     * @private
     */
    function endFunction (node) {
      const count = functionStack.pop()

      /*
       * This rule does not apply to class static blocks, but we have to track them so
       * that statements in them do not count as statements in the enclosing function.
       */
      if (node.type !== 'StaticBlock') {
        reportIfTooManyStatements(node, count, maxReturnStatements)
      }
    }

    /**
     * Increment the count of return statements in the function.
     * @param {import('eslint').Rule.Node | undefined} node node to evaluate
     * @returns {void}
     * @private
     */
    function countReturnStatements (node) {
      functionStack[functionStack.length - 1] += 1
    }

    /**
     * =====================================================================
     * Public API
     * =====================================================================
     */

    return {
      FunctionDeclaration: startFunction,
      FunctionExpression: startFunction,
      ArrowFunctionExpression: startFunction,
      StaticBlock: startFunction,

      ReturnStatement: countReturnStatements,

      'FunctionDeclaration:exit': endFunction,
      'FunctionExpression:exit': endFunction,
      'ArrowFunctionExpression:exit': endFunction,
      'StaticBlock:exit': endFunction,
    }
  },
}
