import { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda'

interface ReadEventInput {
  input: {
    id: string
  }
}

interface ReadEventResponse {
  message: string
  id: string
}

export const handler: AppSyncResolverHandler<
  ReadEventInput,
  ReadEventResponse
> = async (
  event: AppSyncResolverEvent<ReadEventInput>
): Promise<ReadEventResponse> => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2))

    const { id } = event.arguments.input
    console.log('id:', id)
    return {
      message: 'Hello, world!',
      id: id,
    }
  } catch (error) {
    console.error('Error handling the event:', error)
    throw new Error('An error occurred')
  }
}
