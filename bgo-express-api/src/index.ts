import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from './resolvers/index.js'
import { readFileSync } from 'fs'
import { Contexts, dataSources } from './context.js'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.json()
  ),
  defaultMeta: { service: 'bgo-express-api' },
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'apollo-server.log' }),
  ],
})

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

// export interface MyContext {
//   dataSources: {
//     booksAPI: BooksDataSource
//     eventsAPI: EventsDataSource
//   }
// }

const loggingPlugin = {
  async requestDidStart(requestContext) {
    logger.debug('Request started', { query: requestContext.request.query })
    return {
      async parsingDidStart() {
        logger.debug('Parsing started')
      },

      async validationDidStart() {
        logger.debug('Validation started')
      },
    }
  },
}

// create an instance of ApolloServer
const server = new ApolloServer<Contexts>({
  typeDefs,
  resolvers,
  plugins: [loggingPlugin],
})

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res}) => {
    // const token = req.headers.authorization || '';
    // const user = await getUser(token);

    return {
      // add data sources to the context
      dataSources: {
        ...dataSources,
      },
      logger,
      // user,
    }
  },
})

console.log(`🚀 Server listening at: ${url}`)
