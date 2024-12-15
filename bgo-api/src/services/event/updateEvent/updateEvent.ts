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
      eventLocation,
      eventDate,
      imagePath,
      updatedTimestamp: new Date().toISOString(),
    }

    const response = await dynamoUtils.updateItem(
      {
        Key: { pk: `${eventRecordPrefix}#${id}`, sk: `${eventRecordPrefix}#${id}` },
        ReturnValues: 'ALL_NEW',
      },
      updatedEventRecord
    )

    if (!response.statusCode || response.statusCode != 200) {
      throw new Error('Failed to update the event')
    }

    const updatedRecord = response.updatedRecord || {}

    return {
      id: id,
      eventName: updatedRecord.eventName,
      description: updatedRecord.description,
      eventLocation: updatedRecord.eventLocation,
      createdTimestamp: updatedRecord.createdTimestamp,
      playedTimestamp: updatedRecord.playedTimestamp,
      imagePath: updatedRecord.imagePath,
    }
  } catch (error) {
    logger.error('Error updating the event:', { error })
    throw new Error('An error occurred while updating the event.')
  }
}
