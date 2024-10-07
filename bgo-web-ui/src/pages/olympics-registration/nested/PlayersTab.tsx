import {
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useDisclosure,
  Text,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ConfirmActionModal from '../../../components/confirm-action-modal/ConfirmActionModal'
import { useState, useEffect } from 'react'
import players from '../../../data/players.json'
import EditPlayerForm from './EditPlayerForm'
import GenericTable, { TableHeader } from './GenericTable'
import { formatPlayerName } from '@utils/stringConversion'
import { FiTrash2, FiEdit } from 'react-icons/fi'

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
  const [selectedPlayer, setSelectedPlayer] = useState<
    ExtendedPlayer | Player | null
  >(null)
  const [extendedPlayers, setExtendedPlayers] = useState<ExtendedPlayer[]>([])

  const handleDeleteClick = (player: ExtendedPlayer) => {
    setSelectedPlayer(player)
    onOpenDelete()
  }

  const handleEditClick = (player: ExtendedPlayer) => {
    setSelectedPlayer(player)
    onOpenEdit()
  }

  const handleAddClick = () => {
    setSelectedPlayer({
      id: 'new',
      fName: '',
      mInit: '',
      lName: '',
      nickName: '',
      phone: '',
      email: '',
      isPlaying: false,
    } as Player)
    onOpenEdit()
  }

  const headers: TableHeader<ExtendedPlayer>[] = [
    { text: 'Player Name', sortKey: 'fullName', subField: 'nickName' },
    { text: 'Email', sortKey: 'email' },
    { text: 'Phone', sortKey: 'phone' },
    { text: 'Playing', sortKey: 'isPlaying' },
    { text: null, sortKey: null },
  ]

  useEffect(() => {
    const extendedPlayers = data.map((player) => ({
      ...player,
      fullName: formatPlayerName(player),
    }))
    setExtendedPlayers(extendedPlayers)
  }, [data])

  const rowActionButtons = (player: ExtendedPlayer) => {
    return (
      <Flex gap={2}>
        <IconButton
          size={'sm'}
          aria-label="delete row"
          icon={<FiTrash2 />}
          onClick={() => handleDeleteClick(player)}
        />
        <IconButton
          size={'sm'}
          aria-label="edit row"
          icon={<FiEdit />}
          onClick={() => handleEditClick(player)}
        />
      </Flex>
    )
  }

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <ButtonGroup colorScheme="blue" size={'md'}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="blue"
              rightIcon={<ChevronDownIcon />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Import CSV</MenuItem>
              <MenuItem isDisabled>Import from Player Group</MenuItem>
              <MenuDivider />
              <MenuItem>Export CSV</MenuItem>
              <MenuItem isDisabled>Export to Player Group</MenuItem>
              <MenuDivider />
              <MenuItem>Set In-Play</MenuItem>
              <MenuItem>Set Out-Of-Play</MenuItem>
              <MenuItem>Remove Selected Players</MenuItem>
              <MenuDivider />
              <MenuItem>Add Player</MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Button onClick={handleAddClick}>Add Player</Button>
        </ButtonGroup>
        <GenericTable
          data={extendedPlayers}
          headers={headers}
          selectedRow={selectedPlayer}
          setSelectedRow={(player) => setSelectedPlayer(player)}
          enableMultiSelect
          multiSelectKeyExtractor={(player) => player.id}
          rowActionButtons={rowActionButtons}
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

      <ConfirmActionModal
        isOpen={isOpenEdit}
        closeAction={onCloseEdit}
        header={
          selectedPlayer && selectedPlayer.id === 'new'
            ? 'Create New Player'
            : 'Edit Player Information'
        }
        body={
          selectedPlayer && (
            <EditPlayerForm player={selectedPlayer} closeAction={onCloseEdit} />
          )
        }
        confirmButtonText={
          selectedPlayer && selectedPlayer.id === 'new' ? 'Create' : 'Save'
        }
        confirmButtonColor="blue"
        size="3xl"
        backgroundColor={useColorModeValue('gray.50', 'gray.800')}
      />
    </>
  )
}
