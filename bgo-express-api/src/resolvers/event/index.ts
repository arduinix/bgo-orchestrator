import { QueryResolvers } from '__generated__/resolvers-types'
import { MutationResolvers } from "__generated__/resolvers-types";
import listEvents from './query/listEvents.js'

// Use the generated `QueryResolvers` type to type check our queries!
export const eventQueries: QueryResolvers = {
  // listEvents: async (_, __, { dataSources }) => {
  //   const events = await dataSources.bgoPrisma.event.findMany()
  //   return events.map((event) => {
  //     return {
  //       ...event,
  //       proposedDatetime: new Date(event.proposedDatetime).toISOString(),
  //       createdTimestamp: new Date(event.createdTimestamp).toISOString(),
  //       updatedTimestamp: new Date(event.updatedTimestamp).toISOString(),
  //       playedTimestamp: new Date(event.playedTimestamp).toISOString(),
  //     }
  //   })
  // },
  listEvents,

  // readEvent: async (_, { input }, { dataSources }) => {
  //   return dataSources.eventsAPI.readEvent(input)
  // },
}



// Use the generated `MutationResolvers` type to type check our mutations!
export const eventMutations: MutationResolvers = {
  // Below, we mock adding a new book. Our data set is static for this
  // example, so we won't actually modify our data.

  // createEvent: async (_, { input }, { dataSources }) => {
  //   return dataSources.eventsAPI.createEvent(input);
  // },
  // updateEvent: async (_, { input }, { dataSources }) => {
  //   return dataSources.eventsAPI.updateEvent(input);
  // }
};

