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
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'

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

        if (aKey < bKey) {
          return -1 * direction
        }
        if (aKey > bKey) {
          return 1 * direction
        }
        return 0
      })
    }
    return players
  }, [players, sortConfig])

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th
                onClick={() => handleSort('fName')}
                cursor="pointer"
                bg="gray.100"
                textAlign="center"
                fontWeight="bold"
                p={4}
              >
                Player Name
              </Th>
              <Th
                onClick={() => handleSort('email')}
                cursor="pointer"
                bg="gray.100"
                textAlign="center"
                fontWeight="bold"
                p={4}
              >
                Email
              </Th>
              <Th
                onClick={() => handleSort('phone')}
                cursor="pointer"
                bg="gray.100"
                textAlign="center"
                fontWeight="bold"
                p={4}
              >
                Phone
              </Th>
              <Th
                onClick={() => handleSort('isPlaying')}
                cursor="pointer"
                bg="gray.100"
                textAlign="center"
                fontWeight="bold"
                p={4}
              >
                Playing
              </Th>
              <Th bg="gray.100" textAlign="center" fontWeight="bold" p={4}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((player) => {
              const { id, fName, mInit, lName, email, phone, isPlaying } =
                player
              const isSelected = selectedPlayer?.id === id
              return (
                <Tr
                  key={id}
                  bg={isSelected ? 'blue.100' : 'white'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <Td>{`${fName} ${mInit ? `${mInit}.` : ''} ${lName}`}</Td>
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
                        aria-label="delete player"
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
