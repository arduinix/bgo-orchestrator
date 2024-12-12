import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import { recordPrefix } from 'lib/config'
import * as dotenv from 'dotenv'
import { Logger, LogLevel } from '@aws-lambda-powertools/logger'
import { Event, MutationCreateEventArgs } from 'types/generated/graphql'
import { ulid } from 'ulid'

const eventRecordPrefix = recordPrefix.event
const methodName = 'createEvent'

dotenv.config()
const logger = new Logger({
  serviceName: methodName,
  logLevel: process.env.LOG_LEVEL_DEBUG === 'true' ? LogLevel.DEBUG : LogLevel.INFO,
})
const tableName = process.env.BGO_DATA_TABLE_NAME || ''

export const handler: AppSyncResolverHandler<MutationCreateEventArgs, Event> = async (
  event: AppSyncResolverEvent<MutationCreateEventArgs>
): Promise<Event> => {
  try {
    logger.info(`Start ${methodName} handler`)
    logger.debug('Received event:', { event })
    const dynamoUtils = new DynamoUtils({tableName})

    const { eventName, description, eventDate, eventLocation, imagePath } = event.arguments.input

    const id = ulid()

    const newEventRecord = {
      eventName,
      description,
      eventDate,
      eventLocation,
      imagePath,
      createdTimestamp: new Date().toISOString(),
    }

    const response = await dynamoUtils.putItem({
      Item: {
        pk: `${eventRecordPrefix}#${id}`,
        sk: `${eventRecordPrefix}#${id}`,
        ...newEventRecord,
      },
    })

    console.log('response:', response)

    if (!response) {
      throw new Error('Failed to create event')
    }

    return {
      id,
      ...newEventRecord,
    }
  } catch (error) {
    logger.error('Error creating the event:', { error })
    throw new Error('An error occurred while creating the event.')
  }
}
