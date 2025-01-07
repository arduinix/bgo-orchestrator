import { QueryResolvers } from '__generated__/resolvers-types'

const readEvent: QueryResolvers['readEvent'] = async (_, { input }, { dataSources, logger }) => {
  const { id } = input
  const event = await dataSources.bgoPrisma.event.findUnique({
    where: {
      id: id,
    },
  })

  return {
    ...event,
    proposedDatetime: new Date(event.proposedDatetime).toISOString(),
    createdTimestamp: new Date(event.createdTimestamp).toISOString(),
    updatedTimestamp: new Date(event.updatedTimestamp).toISOString(),
    playedTimestamp: new Date(event.playedTimestamp).toISOString(),
  }
}

export default readEvent
