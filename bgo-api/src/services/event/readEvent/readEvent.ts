import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import * as dotenv from 'dotenv'
import { Logger } from '@aws-lambda-powertools/logger'
import { ulid } from 'ulid'

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
  eventName: string
  eventLocation: string
  createdTimestamp: string
  playedTimestamp?: string
  imagePath?: string
}

export const handlerGetItem: AppSyncResolverHandler<ReadEventInput, Event> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<Event> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input

    const dynamoUtils = new DynamoUtils(data_table_name)

    const eventRecord = await dynamoUtils.getItem({
      Key: { pk: `event#${id}`, sk: `event#${id}` },
    })

    if (!eventRecord) {
      throw new Error('Requested event not found.')
    }

    const { eventName, eventLocation, createdTimestamp, playedTimestamp, imagePath } = eventRecord

    return {
      id: id,
      eventName: eventName,
      eventLocation: eventLocation,
      createdTimestamp: createdTimestamp,
      playedTimestamp: playedTimestamp,
      imagePath: imagePath,
    }
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}

export const handlerPutItem: AppSyncResolverHandler<ReadEventInput, any> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<any> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const id = ulid()

    const dynamoUtils = new DynamoUtils(data_table_name)

    const location = 'Dormont, PA'

    const response = await dynamoUtils.putItem({
      Item: {
        pk: `event#${id}`,
        sk: `event#${id}`,
        eventLocation: location,
        eventName: 'BGO Event',
        createdTimestamp: new Date().toISOString(),
      },
    })

    return response
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}

export const handlerQuery: AppSyncResolverHandler<ReadEventInput, any> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<any> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input

    const dynamoUtils = new DynamoUtils(data_table_name)

    const location = 'Dormont, PA'
    //const location = 'Broomfield, CO'

    // const events = await dynamoUtils.query({
    //   KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
    //   FilterExpression: 'eventLocation = :loc',
    //   ExpressionAttributeValues: {
    //     ':pk': `event#${id}`,
    //     ':sk': 'event#',
    //     ':loc': location,
    //   },
    // })

    const response = await dynamoUtils.query(
      {
        KeyConditionExpression: 'eventLocation = :loc',
        ExpressionAttributeValues: {
          ':loc': location,
        },
        IndexName: 'eventLocation-index',
        Limit: 1,
      },
      false
    )

    const { items: events, lastEvaluatedKey } = response

    console.log('lastEvaluatedKey', lastEvaluatedKey)

    return events
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}

export const handlerUpdateItem: AppSyncResolverHandler<ReadEventInput, any> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<any> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input

    const dynamoUtils = new DynamoUtils(data_table_name)

    const location = 'Broomfield, CO'

    const response = await dynamoUtils.updateItem(
      {
        Key: { pk: `event#${id}`, sk: `event#${id}` },
        ReturnValues: 'ALL_NEW',
      },
      {
        eventLocation: location,
      }
    )

    return response
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}

export const handlerDeleteItem: AppSyncResolverHandler<ReadEventInput, any> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<any> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input

    const dynamoUtils = new DynamoUtils(data_table_name)

    const response = await dynamoUtils.deleteItem({
      Key: { pk: `event#${id}`, sk: `event#${id}` },
    })

    return response
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}

export const handlerScan: AppSyncResolverHandler<ReadEventInput, any> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<any> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const dynamoUtils = new DynamoUtils(data_table_name)

    const response = await dynamoUtils.scan({})

    const { items: events, lastEvaluatedKey } = response

    console.log('lastEvaluatedKey', lastEvaluatedKey)

    return events
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}

export { handlerScan as handler }
