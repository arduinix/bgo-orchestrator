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
import events from '@data/events.json'
// import { getMessageQuery } from '@/graphql/message'
// import { useQuery } from 'urql'

export default function OlympicsEventChooser() {
  const data: ListEvent[] = events.listEvents
  // const [result] = useQuery({ query: getMessageQuery })
  // const { data: messageData } = result

  // console.log('messageData', messageData)
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'4xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Events
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Get started by creating a new event. Click an existing event to start
          game play and see event details.
        </Text>
      </Stack>

      <Container
        maxW={'8xl'}
        mt={6}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <Flex m={6} w={'70%'} justifyContent={'space-between'}>
          <Flex gap={3}>
            <Checkbox defaultChecked>Show only my events</Checkbox>
            <Checkbox defaultChecked>Show past events</Checkbox>
          </Flex>
          <Spacer />
          <Button colorScheme='blue'>Create New Event</Button>
        </Flex>
        <Flex flexWrap='wrap' gridGap={6}>
          {data.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
