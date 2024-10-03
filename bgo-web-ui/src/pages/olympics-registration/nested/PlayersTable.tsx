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
  useDisclosure,
  Text,
  Flex,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { RxHamburgerMenu } from 'react-icons/rx'
import ConfirmActionModal from '../../../components/confirm-action-modal/ConfirmActionModal'
import players from '../../../data/players.json'

export default function PlayersTable() {
  const data = players.players as Player[]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Player
    direction: 'ascending' | 'descending'
  } | null>(null)

  const handleDeleteClick = (player: Player) => {
    setSelectedPlayer(player)
    onOpen()
  }

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
      return [...data].sort((a, b) => {
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
    return data
  }, [data, sortConfig])

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort('fName')}>Player Name</Th>
              <Th onClick={() => handleSort('email')}>Email</Th>
              <Th onClick={() => handleSort('phone')}>Phone</Th>
              <Th onClick={() => handleSort('isPlaying')}>Playing</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((player) => {
              const { id, fName, mInit, lName, email, phone, isPlaying } =
                player
              return (
                <Tr key={id}>
                  <Td>{`${fName} ${mInit ? `${mInit}.` : ''} ${lName}`}</Td>
                  <Td>{email}</Td>
                  <Td>{phone}</Td>
                  <Td>
                    <Checkbox size={'lg'} isChecked={isPlaying} />
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
                        icon={<RxHamburgerMenu />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmActionModal
        isOpen={isOpen}
        closeAction={onClose}
        header="Delete Player?"
        body={
          <>
            Are you sure you want to remove player{' '}
            {selectedPlayer ? (
              <Text as="strong">
                {selectedPlayer.fName}{' '}
                {selectedPlayer.mInit ? `${selectedPlayer.mInit}.` : ''}{' '}
                {selectedPlayer.lName}
              </Text>
            ) : (
              'this player'
            )}
            ? This action cannot be undone.
          </>
        }
      />
    </>
  )
}
