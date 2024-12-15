import { QueryResolvers } from '__generated__/resolvers-types'

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  // Our third argument (`contextValue`) has a type here, so we
  // can check the properties within our resolver's shared context value.
  books: async (_, __, { dataSources }) => {
    return dataSources.booksAPI.getBooks()
  },

  // listEvents: async (_, __, { dataSources }) => {
  //   return dataSources.eventsAPI.listEvents()
  // },

  listEvents: async (_, __, { dataSources }) => {
    const events = await dataSources.bgoPrisma.event.findMany()
    // loop through the events and format the date

    return events.map((event) => {
      return {
        ...event,
        proposedDatetime: new Date(event.proposedDatetime).toISOString(),
        createdTimestamp: new Date(event.createdTimestamp).toISOString(),
        updatedTimestamp: new Date(event.updatedTimestamp).toISOString(),
        playedTimestamp: new Date(event.playedTimestamp).toISOString(),
      }
    })
  },

  // readEvent: async (_, { input }, { dataSources }) => {
  //   return dataSources.eventsAPI.readEvent(input)
  // },
}

export default queries
