/** Base URL for Microsoft Graph API */
export const MSAL_GRAPH_ENDPOINT = 'https://graph.microsoft.com'

/** Version of Microsoft Graph API to query, by default */
export const MSAL_GRAPH_ENDPOINT_VERSION = 'v1.0'

/** Base URL for Microsoft Graph API, including the default version */
export const MSAL_GRAPH_ENDPOINT_URL = `${MSAL_GRAPH_ENDPOINT}/${MSAL_GRAPH_ENDPOINT_VERSION}`

/** URL for Microsoft Graph API, including the default version, to query the current user info */
export const MSAL_GRAPH_PROFILE_URL = `${MSAL_GRAPH_ENDPOINT_URL}/me`

/** URL for Microsoft Graph API, including the default version, to query the current user groups */
export const MSAL_GRAPH_GROUP_LIST_URL = `${MSAL_GRAPH_PROFILE_URL}/transitiveMemberOf`
