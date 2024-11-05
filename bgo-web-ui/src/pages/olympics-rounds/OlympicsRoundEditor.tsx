import { Heading, Box, Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import rounds from '@data/rounds.json'
import ReusableAccordion from '@/components/reusable-accordion/ReusableAccordion'
import RoundPlayersTable from './RoundPlayersTable'
import RoundGamesTable from './RoundGamesTable'
import ScrollingConsole from '@/components/scrolling-console/ScrollingConsole'
import RoundMatchTable from './RoundMatchTable'

export default function OlympicsRoundEditor() {
  const roundData: Round[] = rounds.rounds
  const selectedRound = () => roundData.find((round) => round.id === roundId)

  const { roundId } = useParams()

  // const tabs = [{ label: 'Setup', content: <>setup</> }]
  return (
    <Flex flexDir={'column'}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box>
          <Heading pl={4} pr={4} size={'md'}>
            Round {selectedRound()?.roundNumber}
          </Heading>
        </Box>
      </Flex>
      {/* <ReusableTabs tabs={tabs} /> */}
      <ReusableAccordion
        items={[
          { title: 'Players', content: <RoundPlayersTable /> },
          { title: 'Games', content: <RoundGamesTable /> },
          { title: 'Matches', content: <RoundMatchTable /> },
        ]}
      />
      <ScrollingConsole logs={['Event/Round logs']} />
    </Flex>
  )
}
