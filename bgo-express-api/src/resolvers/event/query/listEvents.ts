import { QueryResolvers, Event } from '__generated__/resolvers-types'
import { GraphQLError } from 'graphql'
import { parseDate } from '../../../lib/dateUtils.js'

const listEvents: QueryResolvers['listEvents'] = async (
  _,
  __,
  { dataSources, logger, user }
): Promise<Event[]> => {
  try {
    const events = await dataSources.bgoPrisma.event.findMany({
      where: {
        OR: [{ ownedByUserId: user.sub }, { entitledUsers: { some: { userId: user.sub } } }],
      },
    })

    return events.map((event) => {
      return {
        ...event,
        proposedDatetime: parseDate(event.proposedDatetime),
        createdTimestamp: parseDate(event.createdTimestamp),
        updatedTimestamp: parseDate(event.updatedTimestamp),
        playedTimestamp: parseDate(event.playedTimestamp),
      }
    })
  } catch (error) {
    logger.error(error)
    throw new GraphQLError(`Error listing events ${error.message}`)
  }
}

export default listEvents
