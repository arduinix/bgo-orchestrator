import { Flex, Heading, Box } from '@chakra-ui/react'
import events from '@data/events.json'

export default function EventHeading({ eventId }: { eventId?: string }) {
  // TODO: once we have the api up, we should show a skeleton loader until the data is available
  const event = events.listEvents.find((event) => event.id === eventId)

  return event ? (
    <Flex justifyContent='space-between' alignItems='center'>
      <Box bg={'gray.100'} rounded={10}>
        <Heading p={2} pl={4} pr={4} size={'md'}>
          {event.name}
        </Heading>
      </Box>
    </Flex>
  ) : null
}
