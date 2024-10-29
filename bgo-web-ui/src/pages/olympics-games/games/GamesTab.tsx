import {
  Button,
  Group,
  Flex,
  Spacer,
  useDisclosure,
  Text,
  MenuSeparator,
  IconButton,
  Badge,
} from '@chakra-ui/react'
import {
  MenuRoot,
  MenuItem,
  MenuContent,
  MenuTrigger,
} from '@components/ui/menu'
import { GoChevronDown } from 'react-icons/go'
import ConfirmActionModal from '@components/confirm-action-modal/ConfirmActionModal'
import { useState, useMemo } from 'react'
import games from '@data/games.json'
// import EditCategoryForm from './EditCategoryForm'
import EditGameForm from './EditGameForm'
import GenericTable, {
  TableHeader,
} from '@components/generic-table/GenericTable'
import { FiTrash2, FiEdit } from 'react-icons/fi'

export default function GamesTab() {
  const data: Game[] = games.games
  const {
    open: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const {
    open: isOpenEdit,
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
        // color: useColorModeValue('#206CAF', '#3ca4ff'),
        color: '#206CAF',
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
      }
    })
  }, [data])

  const rowActionButtons = (game: ExtendedGame) => {
    return (
      <Flex gap={2}>
        <IconButton
          size={'sm'}
          aria-label='delete row'
          onClick={() => handleDeleteClick(game)}
        >
          <FiTrash2 />
        </IconButton>
        <IconButton
          size={'sm'}
          aria-label='edit row'
          onClick={() => handleEditClick(game)}
        >
          <FiEdit />
        </IconButton>
      </Flex>
    )
  }

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <Group colorScheme='blue' size={'md'}>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button colorPalette={'blue'}>
                <Flex alignItems='center'>
                  Actions
                  <GoChevronDown />
                </Flex>
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value='set-in-play'>Set In-Play</MenuItem>
              <MenuItem value='set-out-of-play'>Set Out-Of-Play</MenuItem>
              <MenuSeparator />
              <MenuItem value='remove-selected'>Remove Selected Games</MenuItem>
              <MenuSeparator />
              <MenuItem onClick={handleAddClick} value='add-game'>
                Add Game
              </MenuItem>
            </MenuContent>
          </MenuRoot>
          <Spacer />
          <Button onClick={handleAddClick}>Add Game</Button>
        </Group>
        <GenericTable
          data={extendedGames}
          headers={headers}
          selectedRow={selectedGame as ExtendedGame}
          setSelectedRow={(game) => setSelectedGame(game)}
          enableMultiSelect
          multiSelectKeyExtractor={(game) => game.id}
          rowActionButtons={rowActionButtons}
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
        // backgroundColor={useColorModeValue('gray.50', 'gray.800')}
        backgroundColor={'gray.50'}
      />
    </>
  )
}
