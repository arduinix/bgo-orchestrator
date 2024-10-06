import {
  Button,
  ButtonGroup,
  Input,
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
  Box,
  Checkbox,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import PlayersTable from './PlayersTable'
import ConfirmActionModal from '../../../components/confirm-action-modal/ConfirmActionModal'
import { useState, useEffect } from 'react'
import players from '../../../data/players.json'
import EditPlayerForm from './EditPlayerForm'
import GenericTable, { TableHeader } from './GenericTable'
import { formatPlayerName } from '@utils/stringConversion'

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
  const [selectedPlayer, setSelectedPlayer] = useState<EnhancedPlayer | null>(
    null
  )
  const [enhancedPlayers, setEnhancedPlayers] = useState<EnhancedPlayer[]>([])

  const handleDeleteClick = (player: EnhancedPlayer) => {
    setSelectedPlayer(player)
    onOpenDelete()
  }

  const handleEditClick = (player: EnhancedPlayer) => {
    setSelectedPlayer(player)
    onOpenEdit()
  }

  const headers: TableHeader<EnhancedPlayer>[] = [
    {
      text: (
        <Box>
          <Checkbox size={'lg'}></Checkbox>
        </Box>
      ),
      sortKey: null,
    },
    { text: 'Player Name', sortKey: 'fullName', subField: 'nickName' },
    { text: 'Email', sortKey: 'email' },
    { text: 'Phone', sortKey: 'phone' },
    { text: 'Playing', sortKey: 'isPlaying' },
    { text: null, sortKey: null },
  ]

  useEffect(() => {
    const enhancedPlayers = data.map((player) => ({
      ...player,
      fullName: formatPlayerName(player),
    }))
    setEnhancedPlayers(enhancedPlayers)
  }, [data])

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
              Bulk Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Import CSV</MenuItem>
              <MenuItem>Import Player Group</MenuItem>
              <MenuDivider />
              <MenuItem>Export CSV</MenuItem>
              <MenuItem>Export Player Group</MenuItem>
              <MenuDivider />
              <MenuItem>Withdraw Selected Players</MenuItem>
              <MenuItem>Remove Selected Players</MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Button>Add Player</Button>
        </ButtonGroup>

        <Input placeholder="Search players" />
        {/* <PlayersTable
          players={data}
          selectedPlayer={selectedPlayer}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          setSelectedPlayer={setSelectedPlayer}
        /> */}
        <GenericTable
          data={enhancedPlayers}
          headers={headers}
          handleEditClick={(player) => console.log('Edit', player)}
          handleDeleteClick={(player) => console.log('Delete', player)}
          selectedRow={selectedPlayer}
          setSelectedRow={(player) => setSelectedPlayer(player)}
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
          backgroundColor={useColorModeValue('gray.50', 'gray.800')}
        />
      )}
    </>
  )
}
