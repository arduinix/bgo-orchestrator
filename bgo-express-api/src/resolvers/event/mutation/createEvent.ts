import { MutationResolvers } from '__generated__/resolvers-types'
import { ulid } from 'ulid'

// const createEvent: MutationResolvers['createEvent'] = async (
//   _,
//   { input },
//   { dataSources, logger }
// ) => {
//   const { name, description, proposedDatetime, location, imagePath } = input
//   const event = await dataSources.bgoPrisma.event.create({
//     data: {
//       id: ulid(),
//       name,
//       description,
//       proposedDatetime: new Date(proposedDatetime),
//       location,
//       imagePath,
//       eventPlayerGroup: {
//         create: {
//           id: ulid(),
//         },
//       },
//     },
//   })

//   return {
//     ...event,
//     proposedDatetime: new Date(event.proposedDatetime).toISOString(),
//     createdTimestamp: new Date(event.createdTimestamp).toISOString(),
//     updatedTimestamp: new Date(event.updatedTimestamp).toISOString(),
//     playedTimestamp: new Date(event.playedTimestamp).toISOString(),
//   }
// }

// export default createEvent
