import { Event, MutationResolvers } from '__generated__/resolvers-types'
import { ulid } from 'ulid'
import { GraphQLError } from 'graphql'
import { parseDate } from '../../../lib/dateUtils.js'

const createEvent: MutationResolvers['createEvent'] = async (
  _,
  { input },
  { dataSources, logger, user }
): Promise<Event> => {
  try {
    const { name, description, proposedDatetime, location, imagePath } = input
    logger.debug(`proposedDatetime: ${proposedDatetime}`)
    const event = await dataSources.bgoPrisma.event.create({
      data: {
        id: ulid(),
        name,
        description,
        location,
        proposedDatetime,
        imagePath,
        ownedByUser: {
          connect: {
            id: user.sub,
          },
        },
        entitledUsers: {
          create: {
            userId: user.sub,
            role: 'OWNER',
          },
        },
        eventConfigParameters: {
          create: {
            id: ulid(),
          },
        },
        eventPlayerGroup: {
          create: {
            id: ulid(),
          },
        },
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
    throw new GraphQLError(`Error creating event ${error.message}`, {
      // extensions: {
      //   code: 'INTERNAL_SERVER_ERROR',
      //   http: { status: 500 },
      // },
    })
  }
}

export default createEvent
