import { MutationResolvers } from "__generated__/resolvers-types";

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  // Below, we mock adding a new book. Our data set is static for this
  // example, so we won't actually modify our data.
  addBook: async (_, { title, author }, { dataSources }) => {
    return dataSources.booksAPI.addBook({ title, author });
  },
  // createEvent: async (_, { input }, { dataSources }) => {
  //   return dataSources.eventsAPI.createEvent(input);
  // },
  // updateEvent: async (_, { input }, { dataSources }) => {
  //   return dataSources.eventsAPI.updateEvent(input);
  // }
};

export default mutations;
