import { Client, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
    url: 'http://localhost:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const token = getToken();
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      };
    },
  });

export default client;