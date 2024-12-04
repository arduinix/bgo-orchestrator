import DynamoUtils from 'lib/dynamoUtils'
import { EventRecord } from 'src/types'
import { AppSyncResolverEvent, AppSyncResolverHandler, Handler, Context, Callback } from 'aws-lambda'


type ReadEventInput = {
    input: {
        id: string
    }
}
// export const handler: AppSyncResolverHandler<ReadEventInput> = async (
//   event: AppSyncResolverEvent<ReadEventInput>
// ): Promise<EventRecord> => {
//   const { arguments: args } = event
//   const { eventId } = args

//   const dynamoUtils = new DynamoUtils(process.env.AWS_REGION)
//   const event = await dynamoUtils.getItem<EventRecord>('Events', { pk: 'Event', sk: eventId })

//   if (!event) {
//     throw new Error(`Event not found: ${eventId}`)
//   }

//   return event
// }



// Define the GraphQL resolver function for the "hello" query
export const helloResolver: Handler<AppSyncResolverEvent<any>, any> = async (
  event: AppSyncResolverEvent<any>,
  context: Context,
  callback: Callback
) => {
  try {
    // Log the event to see the structure of the incoming request
    console.log('Received event:', JSON.stringify(event, null, 2));

    console.log('Received context:', JSON.stringify(context, null, 2));

    // Access the arguments passed from the AppSync query (if any)
    const args = event.arguments;
    console.log('Arguments:', args);

    // You can access any context or identity information from the event
    const identity = event.identity;
    console.log('Identity:', identity);

    // Return a response based on the GraphQL query
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello, world!',
        inputArguments: args,  // echo the arguments back if needed
        identity: identity,    // include identity information if needed
      }),
    };
  } catch (error) {
    console.error('Error handling the event:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred',
        error,
      }),
    };
  }
};
