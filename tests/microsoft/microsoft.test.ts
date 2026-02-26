import { describe, expect, it } from 'bun:test'
import {
  MSAL_GRAPH_ENDPOINT,
  MSAL_GRAPH_ENDPOINT_VERSION,
  MSAL_GRAPH_ENDPOINT_URL,
  MSAL_GRAPH_PROFILE_URL,
  MSAL_GRAPH_GROUP_LIST_URL,
} from '../../ts/microsoft/microsoft.util.js'

describe(
  'microsoft constants',
  () => {
    it(
      'MSAL_GRAPH_ENDPOINT is the Graph base URL',
      () => {
        expect(MSAL_GRAPH_ENDPOINT).toBe('https://graph.microsoft.com')
      }
    )

    it(
      'MSAL_GRAPH_ENDPOINT_VERSION is v1.0',
      () => {
        expect(MSAL_GRAPH_ENDPOINT_VERSION).toBe('v1.0')
      }
    )

    it(
      'MSAL_GRAPH_ENDPOINT_URL combines endpoint and version',
      () => {
        expect(MSAL_GRAPH_ENDPOINT_URL).toBe(`${MSAL_GRAPH_ENDPOINT}/${MSAL_GRAPH_ENDPOINT_VERSION}`)
      }
    )

    it(
      'MSAL_GRAPH_PROFILE_URL ends with /me',
      () => {
        expect(MSAL_GRAPH_PROFILE_URL).toBe(`${MSAL_GRAPH_ENDPOINT_URL}/me`)
      }
    )

    it(
      'MSAL_GRAPH_GROUP_LIST_URL ends with /transitiveMemberOf',
      () => {
        expect(MSAL_GRAPH_GROUP_LIST_URL).toBe(`${MSAL_GRAPH_PROFILE_URL}/transitiveMemberOf`)
      }
    )
  }
)
