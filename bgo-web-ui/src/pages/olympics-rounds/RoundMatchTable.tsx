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
  Box,
  IconButton,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import matches from '@data/matches.json'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'
import EditableTextInput from '@/components/editable-text-input/EditableTextInput'
import { GoChevronDown } from 'react-icons/go'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaRegEdit } from 'react-icons/fa'
import OlympicMedal from '@/components/olympic-medal/OlympicMedal'

export default function RoundMatchTable() {
  const data: Match[] = matches.matches

  const headers: TableHeader<ExtendedMatch>[] = [
    {
      text: 'Game',
      sortKey: 'gameNameNode',
      disableDataCellClickAction: true,
    },
    {
      text: 'Phase',
      sortKey: 'phaseBadgeNode',
      disableDataCellClickAction: true,
    },
    {
      text: 'Players',
      showKey: 'playersNode',
      sortKey: 'playersSearchField',
      disableDataCellClickAction: true,
    },
    { text: 'Scores', sortKey: 'scoresNode', disableDataCellClickAction: true },
    {
      text: '',
      sortKey: 'matchActionsNode',
      disableDataCellClickAction: true,
    },
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
                    <Box position={'relative'}>
                      <Menu>
                        <MenuButton
                          m={-10}
                          size={'sm'}
                          as={Button}
                          rightIcon={<GoChevronDown />}
                          variant={'outline'}
                        >
                          {playerMatchScore.playerName}
                        </MenuButton>
                        <MenuList>
                          <MenuItem>Change Match</MenuItem>
                          <MenuItem color={'red.600'}>
                            Remove from Match
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
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
                  <Td>
                    <Flex
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      gap={5}
                    >
                      <Box
                        _hover={{
                          cursor: 'pointer',
                        }}
                      >
                        <EditableTextInput
                          initialValue={playerMatchScore.scoreElement?.score}
                          onValueChange={() => {}}
                        />
                      </Box>
                      <Box justifyContent={'center'} mt={-2} mb={-2}>
                        <OlympicMedal
                          medalType={
                            playerMatchScore.scoreElement?.awardedMedal
                          }
                        />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ),
        matchActionsNode: (
          <Menu placement={'bottom'}>
            <MenuButton
              as={IconButton}
              icon={<FaRegEdit />}
              variant={'outline'}
              background={'gray.100'}
              m={-5}
              size={'sm'}
            />
            <MenuList>
              <MenuItem>Add Player</MenuItem>
              <MenuItem color={'red.600'}>Remove this Match</MenuItem>
            </MenuList>
          </Menu>
        ),
        playersSearchField: match.playerMatchScores
          .map((playerMatchScore) => playerMatchScore.playerName)
          .join(','),
      })),
    [data]
  )

  const matchMenuActions = (
    <Box position={'relative'}>
      <Menu>
        <MenuButton as={IconButton} icon={<RxHamburgerMenu />}>
          Match Actions
        </MenuButton>
        <MenuList>
          <MenuItem>Auto Create All</MenuItem>
          <MenuItem>Assign All Benched Players</MenuItem>
          <MenuItem>Create New Match</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <GenericTable
          data={extendedMatches}
          headers={headers}
          disablePagination
          topRightComponent={matchMenuActions}
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
