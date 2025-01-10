import { QueryResolvers } from '__generated__/resolvers-types'

const listEvents: QueryResolvers['listEvents'] = async (_, __, { dataSources, logger, user }) => {
  const events = await dataSources.bgoPrisma.event.findMany({
    where: {
      OR: [{ ownedByUserId: user.sub }, { entitledUsers: { some: { userId: user.sub } } }],
    },
  })

  return events.map((event) => {
    return {
      ...event,
      proposedDatetime: new Date(event.proposedDatetime).toISOString(),
      createdTimestamp: new Date(event.createdTimestamp).toISOString(),
      updatedTimestamp: new Date(event.updatedTimestamp).toISOString(),
      playedTimestamp: new Date(event.playedTimestamp).toISOString(),
    }
  })
}

export default listEvents
