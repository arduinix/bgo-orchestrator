import { useState } from 'react'
import players from '../../../data/players.json'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  IconButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import ConfirmActionModal from '../../../components/confirm-action-modal/ConfirmActionModal'

export default function PlayersTable() {
  const data = players.players as Player[]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const handleDeleteClick = (player: Player) => {
    setSelectedPlayer(player)
    onOpen()
  }
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Playing</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((player) => {
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
                    <IconButton
                      size={'sm'}
                      aria-label="delete player"
                      icon={<FiTrash2 />}
                      onClick={() => handleDeleteClick(player)}
                    />
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
        confirmAction={onClose}
      />
    </>
  )
}
