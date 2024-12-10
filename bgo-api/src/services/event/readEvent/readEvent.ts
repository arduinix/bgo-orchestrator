import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import * as dotenv from 'dotenv'
import { Logger, LogLevel } from '@aws-lambda-powertools/logger'
import { ReadEventInput, Event } from './types'

dotenv.config()
const logger = new Logger({
  serviceName: 'readEvent',
  logLevel: process.env.LOG_LEVEL_DEBUG === 'true' ? LogLevel.DEBUG : LogLevel.INFO,
})
const data_table_name = process.env.BGO_DATA_TABLE_NAME || ''

export const handler: AppSyncResolverHandler<ReadEventInput, Event> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<Event> => {
  try {
    logger.info('Start readEvent handler')
    logger.debug('Received event:', { event })
    const dynamoUtils = new DynamoUtils(data_table_name)
    const { id } = event.arguments.input
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
    logger.error('Error handling the event:', { error })
    throw new Error('An error occurred while executing the readEvent handler')
  }
}
