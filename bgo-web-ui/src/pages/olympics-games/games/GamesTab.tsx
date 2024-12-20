import {
  Button,
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
} from '@chakra-ui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import ConfirmActionModal from '@components/confirm-action-modal/ConfirmActionModal'
import { useState, useMemo } from 'react'
import games from '@data/games.json'
import EditGameForm from './EditGameForm'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'
import { FiTrash2, FiEdit } from 'react-icons/fi'

export default function GamesTab() {
  const data: Game[] = games.games
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
  const [selectedGame, setSelectedGame] = useState<ExtendedGame | Game | null>(
    null
  )

  const handleDeleteClick = (game: ExtendedGame) => {
    setSelectedGame(game)
    onOpenDelete()
  }

  const handleEditClick = (game: ExtendedGame) => {
    setSelectedGame(game)
    onOpenEdit()
  }

  const handleAddClick = () => {
    setSelectedGame({
      id: 'new',
      name: '',
      description: '',
      category: '',
      isInPlay: false,
      minPlayers: 0,
      maxPlayers: 0,
      lowScoreWins: false,
      addedDate: '',
    } as Game)
    onOpenEdit()
  }

  const headers: TableHeader<ExtendedGame>[] = [
    {
      text: 'Game Name',
      sortKey: 'name',
      cellStyle: {
        fontWeight: 'bold',
        color: useColorModeValue('#206CAF', '#3ca4ff'),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxWidth: '300px',
        // minWidth: '200px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
    },
    {
      text: 'Description',
      sortKey: 'description',
      cellStyle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxWidth: '300px',
        // minWidth: '200px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
    },
    { text: 'Category', sortKey: 'category' },
    {
      text: 'Players',
      sortKey: 'maxPlayers',
      showKey: 'playerScaleDisplayNode',
    },
    {
      text: 'Win',
      sortKey: 'lowScoreWins',
      showKey: 'scoreMethodDisplayNode',
    },
    { text: 'Duration', sortKey: 'averageCompletionMinutes' },
    { text: 'In Play', sortKey: 'isInPlay' },
    { text: 'Table', sortKey: 'tableAssignmentDisplayNode' },
  ]

  const extendedGames = useMemo(() => {
    return data.map((game) => {
      return {
        ...game,
        playerScaleDisplayNode: (
          <Text>
            {game.minPlayers} - {game.maxPlayers}
          </Text>
        ),
        scoreMethodDisplayNode: (
          <>
            {game.lowScoreWins ? (
              <Badge colorScheme='purple'>Low</Badge>
            ) : (
              <Badge colorScheme='green'>High</Badge>
            )}
          </>
        ),
        tableAssignmentDisplayNode: (
          <Badge colorScheme={game.tableAssignment ? 'green' : 'red'}>
            {game.tableAssignment ? game.tableAssignment : 'Not Assigned'}
          </Badge>
        ),
      }
    })
  }, [data])

  const rowActionButtons = (game: ExtendedGame) => {
    return (
      <Flex gap={2}>
        <IconButton
          size={'sm'}
          aria-label='delete row'
          icon={<FiTrash2 />}
          onClick={() => handleDeleteClick(game)}
        />
        <IconButton
          size={'sm'}
          aria-label='edit row'
          icon={<FiEdit />}
          onClick={() => handleEditClick(game)}
        />
      </Flex>
    )
  }

  const actionButtons = (
    <ButtonGroup size={'md'}>
      <Button onClick={handleAddClick}>Add Game</Button>
      <Menu>
        <MenuButton as={IconButton} icon={<RxHamburgerMenu />} />
        <MenuList>
          <MenuItem>Set In-Play</MenuItem>
          <MenuItem>Set Out-Of-Play</MenuItem>
          <MenuDivider />
          <MenuItem>Auto Assign Tables</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleAddClick}>Add Game</MenuItem>
          <MenuDivider />
          <MenuItem>Remove Selected Games</MenuItem>
        </MenuList>
      </Menu>
    </ButtonGroup>
  )

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <GenericTable
          data={extendedGames}
          headers={headers}
          selectedRow={selectedGame as ExtendedGame}
          multiSelectKeyExtractor={(game) => game.id}
          rowActionButtons={rowActionButtons}
          topRightComponent={actionButtons}
        />
      </Flex>
      <ConfirmActionModal
        isOpen={isOpenDelete}
        closeAction={onCloseDelete}
        header='Delete Game?'
        body={
          <>
            Are you sure you want to remove the game{' '}
            {selectedGame ? (
              <Text as='strong'>{selectedGame.name}</Text>
            ) : (
              'this game'
            )}
            ? This action cannot be undone.
          </>
        }
      />

      <ConfirmActionModal
        isOpen={isOpenEdit}
        closeAction={onCloseEdit}
        header={
          selectedGame?.id === 'new'
            ? 'Create New Game'
            : `Edit Game: ${selectedGame?.name}`
        }
        body={
          selectedGame && (
            <EditGameForm game={selectedGame} closeAction={onCloseEdit} />
          )
        }
        confirmButtonText={selectedGame?.id === 'new' ? 'Create' : 'Save'}
        confirmButtonColor='blue'
        size='3xl'
        backgroundColor={useColorModeValue('gray.50', 'gray.800')}
      />
    </>
  )
}
