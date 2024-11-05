import {
  Flex,
  useColorModeValue,
  Badge,
  Table,
  Tbody,
  Tr,
  Td,
  Input,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import matches from '@data/matches.json'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'

export default function RoundMatchTable() {
  const data: Match[] = matches.matches

  const headers: TableHeader<ExtendedMatch>[] = [
    {
      text: 'Game',
      sortKey: 'gameName',
      cellStyle: {
        fontWeight: 'bold',
        color: useColorModeValue('#206CAF', '#3ca4ff'),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxWidth: '150px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
    },
    { text: 'Phase', sortKey: 'phaseBadgeNode' },
    { text: 'Players', sortKey: 'playersNode' },
    { text: 'Scores', sortKey: 'scoresNode' },
  ]

  const extendedMatches: ExtendedMatch[] = useMemo(
    () =>
      data.map((match) => ({
        ...match,
        gameName: match.game.name,
        phaseBadgeNode: (
          <Badge colorScheme={match.phase === 'complete' ? 'green' : 'red'}>
            {match.phase}
          </Badge>
        ),
        playersNode: (
          <Table>
            <Tbody>
              {match.playerMatchScores.map((playerMatchScore) => (
                <Tr key={playerMatchScore.id}>
                  <Td>{playerMatchScore.playerName}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ),
        scoresNode: (
          <Table>
            <Tbody>
              {match.playerMatchScores.map((playerMatchScore) => (
                <Tr key={playerMatchScore.id}>
                  <Td>
                    <Input
                      width={'4ch'}
                      pl={1}
                      pr={1}
                      placeholder='-'
                      value={playerMatchScore.scoreElement?.score}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ),
      })),
    [data]
  )

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <GenericTable
          data={extendedMatches}
          headers={headers}
          disablePagination
          tableContainerProps={{ height: '650px', overflowY: 'auto' }}
        />
      </Flex>
    </>
  )
}
