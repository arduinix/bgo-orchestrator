import { EventDeletionResult, MutationResolvers } from '__generated__/resolvers-types'
import { GraphQLError } from 'graphql'
import { parseDate } from '../../../lib/dateUtils.js'

const deleteEvent: MutationResolvers['deleteEvent'] = async (
  _,
  { input },
  { dataSources, logger }
): Promise<EventDeletionResult> => {
  try {
    const { id } = input
    const event = await dataSources.bgoPrisma.event.update({
      where: {
        id: id,
      },
      data: {
        deleteRequestTimestamp: new Date(),
      },
    })

    return {
      id: event.id,
      deleteRequestTimestamp: parseDate(event.deleteRequestTimestamp),
    }
  } catch (error) {
    logger.error(error)
    throw new GraphQLError(`Error deleting event ${error.message}`)
  }
}
export default deleteEvent
