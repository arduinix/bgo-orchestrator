import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'
import DynamoUtils from 'lib/dynamoUtils'

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

export const handler: AppSyncResolverHandler<
  ReadEventInput,
  Event
> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<Event> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input

    const dynamoUtils = new DynamoUtils()
    const eventRecord = await dynamoUtils.getItem({
      pk: `Event#${id}`,
      sk: `Event#${id}`,
    })
    }

    if (!eventRecord) {
      throw new Error('Event not found')
    }

    const { name, location, createdTimestamp, playedTimestamp, imagePath } = eventRecord

    return {
      id: id,
      name: name,
      location: location,
      createdTimestamp: createdTimestamp,
      playedTimestamp: playedTimestamp,
      imagePath: imagePath,
    }
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}
