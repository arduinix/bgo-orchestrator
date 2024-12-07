import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import * as dotenv from 'dotenv'
import { Logger } from '@aws-lambda-powertools/logger'
import { QueryInput } from '@aws-sdk/client-dynamodb'

dotenv.config()
const logger = new Logger({ serviceName: 'event-service' })

const data_table_name = process.env.BGO_DATA_TABLE_NAME || ''

interface ReadEventInput {
  input: {
    id: string
  }
}

interface Event {
  id: string
  name: string
  location: string
  createdTimestamp: string
  playedTimestamp?: string
  imagePath?: string
}
// get item
// export const handler: AppSyncResolverHandler<ReadEventInput, Event> = async (
//   event: AppSyncResolverEvent<ReadEventInput>
// ): Promise<Event> => {
//   try {
//     console.log('Received event:', JSON.stringify(event, null, 2))

//     const { id } = event.arguments.input
//     logger.info(`Reading event with id: ${id}`)

//     const dynamoUtils = new DynamoUtils(data_table_name)

//     const eventRecord = await dynamoUtils.getItem({
//       pk: `event#${id}`,
//       sk: `event#${id}`,
//     })

//     if (!eventRecord) {
//       throw new Error('Requested event not found.')
//     }

//     const { name, location, createdTimestamp, playedTimestamp, imagePath } = eventRecord

//     return {
//       id: id,
//       name: name,
//       location: location,
//       createdTimestamp: createdTimestamp,
//       playedTimestamp: playedTimestamp,
//       imagePath: imagePath,
//     }
//   } catch (error) {
//     console.error('Error handling the event:', error)
//     throw new Error('An error occurred')
//   }
// }

// query/list
export const handler: AppSyncResolverHandler<ReadEventInput, any> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<any> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input
    logger.info(`Reading event with id: ${id}`)

    const dynamoUtils = new DynamoUtils(data_table_name)

    // const events = await dynamoUtils.query('pk = :pk AND begins_with(type, :type)', {
    //   ':pk': `event#${id}`,
    //   ':type': 'event#',
    // })
    const location = 'Dormont, PA'

    const queryInput: QueryInput = {
      TableName: data_table_name,
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
      ExpressionAttributeValues: {
        ':pk': `event#${id}`,
        ':sk': 'event#',
      },
    }
    const events = await dynamoUtils.query(
      'location = :location',
      { ':location': location },
      'location-index'
    )

    return events
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}
