import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  Spacer,
  Checkbox,
} from '@chakra-ui/react'
import EventCard from './EventCard'
import events from '../../data/events.json'

export default function OlympicsEventChooser() {
  const data: ListEvent[] = events.listEvents
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Events
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Get started by creating a new event. Click an existing event to start
          game play and see event details.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={6}>
        <Flex m={6} justifyContent={'space-between'}>
          <Flex gap={3}>
            <Checkbox defaultChecked>Show only my events</Checkbox>
            <Checkbox defaultChecked>Show past events</Checkbox>
          </Flex>
          <Spacer />
          <Button colorScheme="blue">Create New Event</Button>
        </Flex>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {data.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
