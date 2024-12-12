import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'
import { recordPrefix } from 'lib/config'
import * as dotenv from 'dotenv'
import { Logger, LogLevel } from '@aws-lambda-powertools/logger'
import { Event, QueryListEventsArgs } from 'types/generated/graphql'
import { ulid } from 'ulid'

const eventRecordPrefix = recordPrefix.event
const methodName = 'listEvents'

dotenv.config()
const logger = new Logger({
  serviceName: methodName,
  logLevel: process.env.LOG_LEVEL_DEBUG === 'true' ? LogLevel.DEBUG : LogLevel.INFO,
})
const tableName = process.env.BGO_DATA_TABLE_NAME || ''

export const handler: AppSyncResolverHandler<QueryListEventsArgs, Event> = async (
  event: AppSyncResolverEvent<QueryListEventsArgs>
): Promise<Event> => {
  try {
    logger.info(`Start ${methodName} handler`)
    logger.debug('Received event:', { event })
    const dynamoUtils = new DynamoUtils({ tableName })

    const {
      eventCreatedTimestampLower,
      eventCreatedTimestampUpper,
      showEventsOwnedByOthers,
      limit,
      nextToken,
    } = event.arguments.input

    const response = await dynamoUtils.query({
      KeyConditionExpression: 'begins_with(sk, :prefix)',
      ExpressionAttributeValues: {
        ':prefix': `${eventRecordPrefix}#`,
      },
      Limit: limit || undefined,
    })

    if (!response.statusCode || response.statusCode != 200) {
      throw new Error('Failed to retrieve events')
    }

    return response.items || []
  } catch (error) {
    logger.error('Error listing the events:', { error })
    throw new Error('An error occurred while attempting to list events.')
  }
}
