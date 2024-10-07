import React, { useState, ReactNode } from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  Flex,
  Text,
  useColorMode,
  Box,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { formatPlayerName } from '@utils/stringConversion'
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa'

export interface PlayersTableProps {
  players: Player[]
  selectedPlayer?: Player | null
  handleDeleteClick: (player: Player) => void
  handleEditClick: (player: Player) => void
  setSelectedPlayer: (player: Player) => void
}

interface TableHeader {
  text: string | ReactNode | null
  sortKey: keyof Player | null
}

export default function PlayersTable({
  players,
  selectedPlayer,
  handleDeleteClick,
  handleEditClick,
  setSelectedPlayer,
}: PlayersTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player
    direction: 'ascending' | 'descending'
  } | null>(null)

  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'dark' ? 'gray.700' : 'white'
  const textColor = colorMode === 'dark' ? 'white' : 'black'
  const subTextColor = colorMode === 'dark' ? 'gray.100' : 'gray.500'
  const headerBgColor = colorMode === 'dark' ? 'gray.800' : 'gray.100'
  const selectedBgColor = colorMode === 'dark' ? 'blue.900' : 'blue.100'

  const handleSort = (key: keyof Player) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof Player) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? (
        <FaSortAlphaDown />
      ) : (
        <FaSortAlphaDownAlt />
      )
    }
    return null
  }

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...players].sort((a, b) => {
        const key = sortConfig.key
        const direction = sortConfig.direction === 'ascending' ? 1 : -1

        const aKey = a[key]
        const bKey = b[key]
        if (aKey === null || bKey === null) {
          return 0
        }

        if (bKey !== undefined && aKey !== undefined && aKey < bKey) {
          return -1 * direction
        }
        if (aKey !== undefined && bKey !== undefined && aKey > bKey) {
          return 1 * direction
        }
        return 0
      })
    }
    return players
  }, [players, sortConfig])

  const headers: TableHeader[] = [
    {
      text: (
        <Box>
          <Checkbox size={'lg'}></Checkbox>
        </Box>
      ),
      sortKey: null,
    },
    { text: 'Player Name', sortKey: 'fName' },
    { text: 'Email', sortKey: 'email' },
    { text: 'Phone', sortKey: 'phone' },
    { text: 'Playing', sortKey: 'isPlaying' },
    { text: null, sortKey: null }, // For the empty header
  ]

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {headers.map((header, index) => {
                const { text, sortKey } = header
                return (
                  <Th
                    key={index}
                    onClick={
                      sortKey !== null ? () => handleSort(sortKey) : undefined
                    }
                    cursor={sortKey ? 'pointer' : 'default'}
                    bg={headerBgColor}
                    color={textColor}
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={'sm'}
                    p={4}
                  >
                    <Flex>
                      <Box mr={2}>{text}</Box>
                      <Box>{sortKey && getSortIcon(sortKey)}</Box>
                    </Flex>
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((data) => {
              const { id, email, phone, isPlaying, nickName } = data
              const isSelected = selectedPlayer?.id === id
              return (
                <Tr
                  key={id}
                  bg={isSelected ? selectedBgColor : bgColor}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPlayer(data)}
                >
                  <Td>
                    <Checkbox size={'lg'} />
                  </Td>
                  <Td color={textColor}>
                    <Flex flexDirection={'column'}>
                      <Text>{formatPlayerName(data)}</Text>
                      {nickName && (
                        <Text fontSize={'sm'} color={subTextColor}>
                          {`"${nickName}"`}
                        </Text>
                      )}
                    </Flex>
                  </Td>
                  <Td color={textColor}>{email}</Td>
                  <Td color={textColor}>{phone}</Td>
                  <Td color={textColor}>
                    <Flex justifyContent="center" alignItems="center">
                      <Checkbox size={'lg'} isChecked={isPlaying} />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <IconButton
                        size={'sm'}
                        aria-label="delete player"
                        icon={<FiTrash2 />}
                        onClick={() => handleDeleteClick(data)}
                      />
                      <IconButton
                        size={'sm'}
                        aria-label="edit player"
                        icon={<FiEdit />}
                        onClick={() => handleEditClick(data)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
