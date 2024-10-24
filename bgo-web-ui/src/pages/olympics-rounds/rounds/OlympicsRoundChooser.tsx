import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Button,
  Spacer,
  Checkbox,
} from '@chakra-ui/react'
import EventCard from './OlympicsRoundCard'
import events from '@data/events.json'

export default function OlympicsRoundChooser() {
  const data: ListEvent[] = events.listEvents
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'4xl'} textAlign={'center'}>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Prepare and start a new round. Or view and edit data from past rounds.
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
            <Checkbox size={'lg'} defaultChecked>
              Show current
            </Checkbox>
            <Checkbox size={'lg'} defaultChecked>
              Show finished
            </Checkbox>
            <Checkbox size={'lg'} defaultChecked>
              Show removed
            </Checkbox>
          </Flex>
          <Spacer />
          <Button colorScheme='blue'>Create Round</Button>
        </Flex>
        <Flex flexWrap='wrap' gridGap={6} justify={'center'}>
          {data.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
