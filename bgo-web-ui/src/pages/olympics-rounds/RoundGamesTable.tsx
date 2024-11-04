import { Flex, useColorModeValue, Badge, Switch } from '@chakra-ui/react'
import { useMemo } from 'react'
import games from '@data/games.json'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'

export default function RoundGamesTable() {
  const data: Game[] = games.games

  const headers: TableHeader<ExtendedGame>[] = [
    {
      text: 'Game Name',
      sortKey: 'name',
      cellStyle: {
        fontWeight: 'bold',
        color: useColorModeValue('#206CAF', '#3ca4ff'),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxWidth: '300px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
    },

    { text: 'Table', sortKey: 'tableAssignmentDisplayNode' },
    { text: 'In Play', sortKey: 'isInPlayToggleNode' },
  ]

  const extendedGames: ExtendedGame[] = useMemo(() => {
    return data.map((game) => {
      return {
        ...game,
        tableAssignmentDisplayNode: (
          <Badge colorScheme={game.tableAssignment ? 'green' : 'red'}>
            {game.tableAssignment ? game.tableAssignment : 'None'}
          </Badge>
        ),
        isInPlayToggleNode: (
          <Switch isChecked={game.isInPlay} onChange={() => {}} size={'md'} />
        ),
      }
    })
  }, [data])

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <GenericTable
          data={extendedGames}
          headers={headers}
          multiSelectKeyExtractor={(game) => game.id}
        />
      </Flex>
    </>
  )
}
