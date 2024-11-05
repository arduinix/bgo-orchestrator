import { Flex, useColorModeValue, Switch } from '@chakra-ui/react'
import { useMemo } from 'react'
import players from '@data/players.json'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'
import { formatPlayerName } from '@utils/stringConversion'

export default function RoundPlayersTable() {
  const data: Player[] = players.players

  const headers: TableHeader<ExtendedPlayer>[] = [
    {
      text: 'Player Name',
      sortKey: 'fullName',
      subField: 'nickName',
      cellStyle: {
        fontWeight: 'bold',
        maxWidth: '150px',
        color: useColorModeValue('#206CAF', '#3ca4ff'),
      },
      subFieldStyle: {
        fontWeight: 'normal',
        color: '#4A8DD9',
        fontSize: 'sm',
        fontStyle: 'italic',
        '::before': {
          content: '"“"',
        },
        '::after': {
          content: '"”"',
        },
      },
    },
    { text: 'Playing', sortKey: 'isPlayingToggleNode' },
  ]

  const extendedPlayers: ExtendedPlayer[] = useMemo(
    () =>
      data.map((player) => ({
        ...player,
        fullName: formatPlayerName(player),
        isPlayingToggleNode: (
          <Switch
            isChecked={player.isPlaying}
            onChange={() => {}}
            size={'md'}
          />
        ),
      })),
    [data]
  )

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <GenericTable
          data={extendedPlayers}
          headers={headers}
          disablePagination
          tableContainerProps={{height:'650px', overflowY: 'auto'}}
        />
      </Flex>
    </>
  )
}
