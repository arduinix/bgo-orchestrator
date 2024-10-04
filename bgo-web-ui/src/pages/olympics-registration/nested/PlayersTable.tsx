import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { formatPlayerName } from '@utils/stringConversion'

export interface PlayersTableProps {
  players: Player[]
  selectedPlayer?: Player | null
  handleDeleteClick: (player: Player) => void
  handleEditClick: (player: Player) => void
  setSelectedPlayer: (player: Player) => void
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

  interface TableHeader {
    text: string | null
    sortKey: keyof Player | null
  }
  const headers: TableHeader[] = [
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
                    bg="gray.100"
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={'sm'}
                    p={4}
                  >
                    {text}
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((player) => {
              const { id, email, phone, isPlaying, nickName } = player
              const isSelected = selectedPlayer?.id === id
              return (
                <Tr
                  key={id}
                  bg={isSelected ? 'blue.100' : 'white'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <Td>
                    <Flex flexDirection={'column'}>
                      <Text>{formatPlayerName(player)}</Text>
                      {nickName && (
                        <Text fontSize={'sm'} color={'gray.600'}>
                          {`"${nickName}"`}
                        </Text>
                      )}
                    </Flex>
                  </Td>
                  <Td>{email}</Td>
                  <Td>{phone}</Td>
                  <Td>
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
                        onClick={() => handleDeleteClick(player)}
                      />
                      <IconButton
                        size={'sm'}
                        aria-label="edit player"
                        icon={<FiEdit />}
                        onClick={() => handleEditClick(player)}
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
