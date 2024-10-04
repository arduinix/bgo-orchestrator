import {
  Button,
  ButtonGroup,
  Input,
  Flex,
  Spacer,
  useDisclosure,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import PlayersTable from './PlayersTable'
import ConfirmActionModal from '../../../components/confirm-action-modal/ConfirmActionModal'
import { useState } from 'react'
import players from '../../../data/players.json'
import EditPlayerForm from './EditPlayerForm'

export default function PlayersTab() {
  const data: Player[] = players.players
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const handleDeleteClick = (player: Player) => {
    setSelectedPlayer(player)
    onOpenDelete()
  }

  const handleEditClick = (player: Player) => {
    setSelectedPlayer(player)
    onOpenEdit()
  }

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <ButtonGroup colorScheme="blue" size={'md'}>
          <Button>Import CSV</Button>
          <Button>Import Player Group</Button>
          <Spacer />
          <Button>Add Player</Button>
        </ButtonGroup>

        <Input placeholder="Search players" />
        <PlayersTable
          players={data}
          selectedPlayer={selectedPlayer}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          setSelectedPlayer={setSelectedPlayer}
        />
      </Flex>
      <ConfirmActionModal
        isOpen={isOpenDelete}
        closeAction={onCloseDelete}
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
      {selectedPlayer && (
        <ConfirmActionModal
          isOpen={isOpenEdit}
          closeAction={onCloseEdit}
          header="Edit Player Information"
          body={
            <EditPlayerForm player={selectedPlayer} closeAction={onCloseEdit} />
          }
          confirmButtonText="Save"
          confirmButtonColor="blue"
          size="3xl"
          backgroundColor={useColorModeValue('gray.100', 'gray.800')}
        />
      )}
    </>
  )
}
