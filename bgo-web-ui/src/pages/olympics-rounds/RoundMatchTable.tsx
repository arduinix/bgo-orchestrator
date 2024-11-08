import {
  Flex,
  useColorModeValue,
  Badge,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import matches from '@data/matches.json'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'
import EditableTableCell from '@/components/editable-table-cell/EditableTableCell'
import { GoChevronDown } from 'react-icons/go'
import OlympicMedal from '@/components/olympic-medal/OlympicMedal'

export default function RoundMatchTable() {
  const data: Match[] = matches.matches

  const headers: TableHeader<ExtendedMatch>[] = [
    {
      text: 'Game',
      sortKey: 'gameNameNode',
    },
    { text: 'Phase', sortKey: 'phaseBadgeNode' },
    { text: 'Players', sortKey: 'playersNode' },
    { text: 'Scores', sortKey: 'scoresNode' },
    { text: '', sortKey: 'medalNode' },
  ]

  const extendedMatches: ExtendedMatch[] = useMemo(
    () =>
      data.map((match) => ({
        ...match,
        gameName: match.game.name,
        gameNameNode: (
          <Flex flexDir={'column'} position='relative'>
            <Text
              mb={1}
              sx={{
                fontWeight: 'bold',
                color: useColorModeValue('#206CAF', '#3ca4ff'),
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                maxWidth: '150px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {match.game.name}
            </Text>
            {match.lowScoreWins && (
              <Badge colorScheme='purple' position='absolute' top='100%'>
                Low Wins
              </Badge>
            )}
          </Flex>
        ),
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
                  <Td>
                    <Menu>
                      <MenuButton
                        m={-3}
                        size={'sm'}
                        as={Button}
                        rightIcon={<GoChevronDown />}
                        variant={'outline'}
                      >
                        {playerMatchScore.playerName}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Change Match</MenuItem>
                        <MenuItem color={'red.600'}>Remove from Match</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
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
                  <EditableTableCell
                    initialValue={playerMatchScore.scoreElement?.score}
                    onValueChange={() => {}}
                  />
                </Tr>
              ))}
            </Tbody>
          </Table>
        ),
        medalNode: (
          
          <Table>
            <Tbody>
              {match.playerMatchScores.map((playerMatchScore) => (
                <Tr key={playerMatchScore.id}>
                  {/* <EditableTableCell
                    initialValue={playerMatchScore.scoreElement?.score}
                    onValueChange={() => {}}
                  /> */}
                  <OlympicMedal />
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
