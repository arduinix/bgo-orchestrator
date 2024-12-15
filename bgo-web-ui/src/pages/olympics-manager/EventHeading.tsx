import { Flex, Heading, Box } from '@chakra-ui/react'
import events from '@data/events.json'

export default function EventHeading({ eventId }: { eventId?: string }) {
  const event = events.Events.find((event) => event.id === eventId)

  return event ? (
    <Flex justifyContent='space-between' alignItems='center'>
      <Box>
        <Heading p={2} pl={4} pr={4} size={'md'}>
          {event.name}
        </Heading>
      </Box>
    </Flex>
  ) : null
}
