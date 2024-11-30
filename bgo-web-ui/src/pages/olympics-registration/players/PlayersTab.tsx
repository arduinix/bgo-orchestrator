import {
  ButtonGroup,
  Flex,
  useDisclosure,
  Text,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Badge,
  Tooltip,
  Switch,
} from '@chakra-ui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import ConfirmActionModal from '@components/confirm-action-modal/ConfirmActionModal'
import { useState, useMemo } from 'react'
import players from '@data/players.json'
import EditPlayerForm from './EditPlayerForm'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'
import { formatPlayerName, convertDateShort } from '@utils/stringConversion'
import { FiTrash2, FiEdit, FiPlus } from 'react-icons/fi'

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
      isCheckedIn: false,
    } as Player)
    onOpenEdit()
  }

  const headers: TableHeader<ExtendedPlayer>[] = [
    {
      text: 'Player Name',
      sortKey: 'fullName',
      subField: 'nickName',
      cellStyle: {
        fontWeight: 'bold',
        color: useColorModeValue('#206CAF', '#3ca4ff'),
      },
      subFieldStyle: {
        fontWeight: 'normal',
        color: '#4A8DD9',
        fontSize: 'sm',
        fontStyle: 'italic',
        '::before': {
          content: '"“"',
        },
        '::after': {
          content: '"”"',
        },
      },
    },
    { text: 'Email', sortKey: 'email' },
    { text: 'Phone', sortKey: 'phone' },
    {
      text: 'Invite',
      sortKey: 'inviteTimestamp',
      showKey: 'inviteStatusNode',
    },
    {
      text: 'Checked In',
      sortKey: 'isCheckedIn',
      showKey: 'checkedInNode',
      disableDataCellClickAction: true,
    },
    {
      text: 'Playing',
      sortKey: 'isPlaying',
      showKey: 'playingNode',
      disableDataCellClickAction: true,
    },
  ]

  const inviteStatusNode = (player: Player) => {
    const { inviteTimestamp, inviteAcceptedTimestamp } = player
    if (inviteAcceptedTimestamp) {
      return (
        <Tooltip
          label={`Accepted ${convertDateShort(inviteAcceptedTimestamp)}`}
        >
          <Badge colorScheme='green'>accepted</Badge>
        </Tooltip>
      )
    }
    if (inviteTimestamp) {
      return (
        <Tooltip label={`Invited ${convertDateShort(inviteTimestamp)}`}>
          <Badge colorScheme='orange'>sent</Badge>
        </Tooltip>
      )
    }

    return <Badge colorScheme='red'>not sent</Badge>
  }

  const extendedPlayers = useMemo(
    () =>
      data.map((player) => ({
        ...player,
        fullName: formatPlayerName(player),
        inviteStatusNode: inviteStatusNode(player),
        checkedInNode: (
          <Switch
            pl={5}
            isChecked={player.isCheckedIn}
            onChange={() => {}}
            size={'md'}
          />
        ),
        playingNode: (
          <Switch
            pl={1}
            isChecked={player.isPlaying}
            onChange={() => {}}
            size={'md'}
          />
        ),
      })),
    [data]
  )

  const rowActionButtons = (player: ExtendedPlayer) => {
    return (
      <Flex gap={2}>
        <IconButton
          size={'sm'}
          aria-label='delete player'
          icon={<FiTrash2 />}
          onClick={() => handleDeleteClick(player)}
        />
        <IconButton
          size={'sm'}
          aria-label='edit player'
          icon={<FiEdit />}
          onClick={() => handleEditClick(player)}
        />
      </Flex>
    )
  }

  const actionButtons = (
    <ButtonGroup size={'md'}>
      <IconButton
        size={'md'}
        aria-label='add player'
        icon={<FiPlus />}
        onClick={handleAddClick}
      />
      <Menu>
        <MenuButton as={IconButton} icon={<RxHamburgerMenu />} />
        <MenuList>
          <MenuItem>Import CSV</MenuItem>
          <MenuItem isDisabled>Import from Player Group</MenuItem>
          <MenuDivider />
          <MenuItem>Export CSV</MenuItem>
          <MenuItem isDisabled>Export to Player Group</MenuItem>
          <MenuDivider />
          <MenuItem>Set In-Play</MenuItem>
          <MenuItem>Set Out-Of-Play</MenuItem>
          <MenuDivider />
          <MenuItem>Remove Selected Players</MenuItem>
          <MenuDivider />
          <MenuItem>Send Invites</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleAddClick}>Add Player</MenuItem>
        </MenuList>
      </Menu>
    </ButtonGroup>
  )

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <GenericTable
          data={extendedPlayers}
          headers={headers}
          selectedRow={selectedPlayer as ExtendedPlayer}
          multiSelectKeyExtractor={(player) => player.id}
          rowActionButtons={rowActionButtons}
          rowClickAction={handleEditClick}
          topRightComponent={actionButtons}
        />
      </Flex>
      <ConfirmActionModal
        isOpen={isOpenDelete}
        closeAction={onCloseDelete}
        header='Remove Player?'
        body={
          <>
            Are you sure you want to remove player{' '}
            {selectedPlayer ? (
              <Text as='strong'>
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
            ? 'Add New Player'
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
        confirmButtonColor='blue'
        size='3xl'
        backgroundColor={useColorModeValue('gray.50', 'gray.800')}
      />
    </>
  )
}
