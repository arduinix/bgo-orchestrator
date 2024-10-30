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
import { useMemo } from 'react'
// import events from '@data/events.json'
import rounds from '@data/rounds.json'
import OlympicsRoundCard from './OlympicsRoundCard'

export default function OlympicsRoundChooser() {
  const data: Round[] = rounds.rounds

  const sortedRounds: SortedRound[] = useMemo(() => {
    const sortedRounds = data.sort((a, b) => {
      return (
        new Date(b.createdTimestamp).getTime() -
        new Date(a.createdTimestamp).getTime()
      )
    })
    return sortedRounds.map((round, index) => {
      return {
        ...round,
        roundNumber: sortedRounds.length - index,
      }
    })
  }, [data])

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
          {sortedRounds.map((round) => (
            <OlympicsRoundCard key={round.id} {...round} />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
