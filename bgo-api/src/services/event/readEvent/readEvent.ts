import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import * as dotenv from 'dotenv'
import { Logger, LogLevel } from '@aws-lambda-powertools/logger'
import { Event, QueryReadEventArgs } from 'types/generated/graphql'

dotenv.config()
const logger = new Logger({
  serviceName: 'readEvent',
  logLevel: process.env.LOG_LEVEL_DEBUG === 'true' ? LogLevel.DEBUG : LogLevel.INFO,
})
const tableName = process.env.BGO_DATA_TABLE_NAME || ''

export const handler: AppSyncResolverHandler<QueryReadEventArgs, Event> = async (
  event: AppSyncResolverEvent<QueryReadEventArgs>
): Promise<Event> => {
  try {
    logger.info('Start readEvent handler')
    logger.debug('Received event:', { event })
    const dynamoUtils = new DynamoUtils({ tableName })
    const { id } = event.arguments.input
    const response = await dynamoUtils.getItem({
      Key: { pk: `event#${id}`, sk: `event#${id}` },
    })

    if (!response.statusCode || response.statusCode != 200) {
      throw new Error('Requested event not found.')
    }

    const record = response.record || {}

    const { eventName, description, eventLocation, createdTimestamp, playedTimestamp, imagePath } =
      record

    return {
      id,
      eventName,
      description,
      eventLocation,
      createdTimestamp,
      playedTimestamp,
      imagePath,
    }
  } catch (error) {
    logger.error('Error handling the event:', { error })
    throw new Error('An error occurred while attempting to read the event.')
  }
}
