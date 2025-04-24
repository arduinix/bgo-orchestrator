import { QueryResolvers, Event } from '__generated__/resolvers-types'
import { GraphQLError } from 'graphql'
import { parseDate } from '../../../lib/dateUtils.js'

const readEvent: QueryResolvers['readEvent'] = async (
  _,
  { input },
  { dataSources, logger }
): Promise<Event> => {
  try {
    const { id } = input
    const event = await dataSources.bgoPrisma.event.findUnique({
      where: {
        id: id,
      },
    })

    return {
      ...event,
      proposedDatetime: parseDate(event.proposedDatetime),
      createdTimestamp: parseDate(event.createdTimestamp),
      updatedTimestamp: parseDate(event.updatedTimestamp),
      playedTimestamp: parseDate(event.playedTimestamp),
    }
  } catch (error) {
    logger.error(error)
    throw new GraphQLError(`Error reading event ${error.message}`)
  }
}

export default readEvent
