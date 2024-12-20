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
        maxWidth: '150px',
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
          disablePagination
          tableContainerProps={{
            height: '650px',
            overflowY: 'auto',
            sx: {
              '::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.05)',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: 'gray.300',
                borderRadius: '4px',
              },
            },
          }}
        />
      </Flex>
    </>
  )
}
