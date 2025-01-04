import { QueryResolvers } from '__generated__/resolvers-types'

const listEvents: QueryResolvers['listEvents'] = async (_, __, { dataSources, logger }) => {
  const events = await dataSources.bgoPrisma.event.findMany()

  return events.map((event) => {
    logger.info('event', event)

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
