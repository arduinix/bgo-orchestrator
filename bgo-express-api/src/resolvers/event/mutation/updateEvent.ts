import { Event, MutationResolvers } from '__generated__/resolvers-types'
import { GraphQLError } from 'graphql'
import { parseDate } from '../../../lib/dateUtils.js'

// TODO: Implement a function to cache user entitlements and only perform actions on events that they are entitled to.
const updateEvent: MutationResolvers['updateEvent'] = async (
  _,
  { input },
  { dataSources, logger }
): Promise<Event> => {
  try {
    const { id, name, description, proposedDatetime, location, imagePath } = input
    const event = await dataSources.bgoPrisma.event.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        location,
        proposedDatetime,
        imagePath,
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
    throw new GraphQLError(`Error updating event ${error.message},`)
  }
}
export default updateEvent
