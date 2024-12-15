import { QueryResolvers } from '__generated__/resolvers-types'

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  // Our third argument (`contextValue`) has a type here, so we
  // can check the properties within our resolver's shared context value.
  books: async (_, __, { dataSources }) => {
    return dataSources.booksAPI.getBooks()
  },

  listEvents: async (_, __, { dataSources }) => {
    return dataSources.eventsAPI.listEvents()
  },

  listEvents2: async (_, __, { dataSources }) => {
    const data = await dataSources.bgoPrisma.event.findMany()
    console.log('data', data)
    return data
    // return dataSources.bgoPrisma.event.findMany()
  },

  readEvent: async (_, { input }, { dataSources }) => {
    return dataSources.eventsAPI.readEvent(input)
  },
}

export default queries
