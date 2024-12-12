import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import { recordPrefix } from 'lib/config'
import * as dotenv from 'dotenv'
import { Logger, LogLevel } from '@aws-lambda-powertools/logger'
import { Event, MutationUpdateEventArgs } from 'types/generated/graphql'

const eventRecordPrefix = recordPrefix.event
const methodName = 'updateEvent'

dotenv.config()
const logger = new Logger({
  serviceName: methodName,
  logLevel: process.env.LOG_LEVEL_DEBUG === 'true' ? LogLevel.DEBUG : LogLevel.INFO,
})
const tableName = process.env.BGO_DATA_TABLE_NAME || ''

export const handler: AppSyncResolverHandler<MutationUpdateEventArgs, Event> = async (
  event: AppSyncResolverEvent<MutationUpdateEventArgs>
): Promise<Event> => {
  try {
    logger.info(`Start ${methodName} handler`)
    logger.debug('Received event:', { event })
    const dynamoUtils = new DynamoUtils({ tableName })

    const { id, eventName, description, eventDate, eventLocation, imagePath } =
      event.arguments.input

    const updatedEventRecord = {
      eventName,
      description,
      eventDate,
      eventLocation,
      imagePath,
    }

    const response = await dynamoUtils.updateItem(
      {
        Key: { pk: `${eventRecordPrefix}#${id}`, sk: `${eventRecordPrefix}#${id}` },
        ReturnValues: 'ALL_NEW',
      },
      updatedEventRecord
    )

    if (!response || response.$metadata.httpStatusCode != 200) {
      throw new Error('Failed to update the event')
    }

    const eventRecord = await dynamoUtils.getItem({
      Key: { pk: `event#${id}`, sk: `event#${id}` },
    })
    if (!eventRecord) {
      throw new Error('Requested event not found.')
    }

    return {
      id: id,
      eventName: eventRecord.eventName,
      description: eventRecord.description,
      eventLocation: eventRecord.eventLocation,
      createdTimestamp: eventRecord.createdTimestamp,
      playedTimestamp: eventRecord.playedTimestamp,
      imagePath: eventRecord.imagePath,
    }
  } catch (error) {
    logger.error('Error updating the event:', { error })
    throw new Error('An error occurred while updating the event.')
  }
}
