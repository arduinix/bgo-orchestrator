import { Heading, Box, Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import rounds from '@data/rounds.json'
import ReusableAccordion from '@/components/reusable-accordion/ReusableAccordion'

export default function OlympicsRoundEditor() {
  const roundData: Round[] = rounds.rounds
  const selectedRound = () => roundData.find((round) => round.id === roundId)

  const { roundId } = useParams()

  // const tabs = [{ label: 'Setup', content: <>setup</> }]
  return (
    <Flex flexDir={'column'}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box>
          <Heading p={2} pl={4} pr={4} size={'md'}>
            Round {selectedRound()?.roundNumber}
          </Heading>
        </Box>
      </Flex>
      {/* <ReusableTabs tabs={tabs} /> */}
      <ReusableAccordion items={[{ title: 'asdf', content: 'asdf' }]} />
    </Flex>
  )
}
