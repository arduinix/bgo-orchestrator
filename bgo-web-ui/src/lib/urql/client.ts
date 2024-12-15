import { Client, cacheExchange, fetchExchange } from 'urql'
import { fetchAuthSession } from '@aws-amplify/auth'

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_API_URL as string,
  exchanges: [cacheExchange, fetchExchange],
  fetch: async (url, options) => {
    const session = await fetchAuthSession()
    const token = session.tokens?.accessToken.toString()
    const updatedOptions = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
    return fetch(url, updatedOptions)
  },
})

export default client
