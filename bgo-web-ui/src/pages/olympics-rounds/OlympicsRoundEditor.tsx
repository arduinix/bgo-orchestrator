import { Heading, Box, Flex } from '@chakra-ui/react'
import ReusableTabs from '@components/reusable-tabs/ReuseableTabs'
import { useParams } from 'react-router-dom'
import rounds from '@data/rounds.json'

export default function OlympicsRoundEditor() {
  const data: Round[] = rounds.rounds
  const selectedRound = () => data.find((round) => round.id === roundId)

  const { roundId } = useParams()

  const tabs = [{ label: 'Setup', content: <>setup</> }]
  return (
    <Flex flexDir={'column'}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box>
          <Heading p={2} pl={4} pr={4} size={'md'}>
            Round {selectedRound()?.roundNumber}
          </Heading>
        </Box>
      </Flex>
      <ReusableTabs tabs={tabs} />
    </Flex>
  )
}
