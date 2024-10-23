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
import { useState } from 'react'
import games from '../../../data/games.json'
import EditCategoryForm from './EditCategoryForm'
import GenericTable, {
  TableHeader,
} from '../../../components/generic-table/GenericTable'
import { FiTrash2, FiEdit } from 'react-icons/fi'

export default function CategoriesTab() {
  const data: GameCategory[] = games.catagories
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
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(
    null
  )

  const handleDeleteClick = (category: GameCategory) => {
    setSelectedCategory(category)
    onOpenDelete()
  }

  const handleEditClick = (category: GameCategory) => {
    setSelectedCategory(category)
    onOpenEdit()
  }

  const handleAddClick = () => {
    setSelectedCategory({
      id: 'new',
      name: '',
      description: '',
      totalGames: 0,
      isInPlay: false,
    } as GameCategory)
    onOpenEdit()
  }

  const headers: TableHeader<GameCategory>[] = [
    {
      text: 'Category Name',
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
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      },
    },
    { text: 'Total Games', sortKey: 'totalGames' },
    { text: 'In Play', sortKey: 'isInPlay' },
  ]

  const rowActionButtons = (category: GameCategory) => {
    return (
      <Flex gap={2}>
        <IconButton
          size={'sm'}
          aria-label='delete row'
          icon={<FiTrash2 />}
          onClick={() => handleDeleteClick(category)}
        />
        <IconButton
          size={'sm'}
          aria-label='edit row'
          icon={<FiEdit />}
          onClick={() => handleEditClick(category)}
        />
      </Flex>
    )
  }

  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <ButtonGroup colorScheme='blue' size={'md'}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme='blue'
              rightIcon={<ChevronDownIcon />}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Set In-Play</MenuItem>
              <MenuItem>Set Out-Of-Play</MenuItem>
              <MenuDivider />
              <MenuItem>Remove Selected Catagories</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleAddClick}>Add Category</MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Button onClick={handleAddClick}>Add Category</Button>
        </ButtonGroup>
        <GenericTable
          data={data}
          headers={headers}
          selectedRow={selectedCategory as GameCategory}
          setSelectedRow={(category) => setSelectedCategory(category)}
          enableMultiSelect
          multiSelectKeyExtractor={(category) => category.id}
          rowActionButtons={rowActionButtons}
        />
      </Flex>
      <ConfirmActionModal
        isOpen={isOpenDelete}
        closeAction={onCloseDelete}
        header='Delete Category?'
        body={
          <>
            Are you sure you want to remove category{' '}
            {selectedCategory ? (
              <Text as='strong'>{selectedCategory.name}</Text>
            ) : (
              'this category'
            )}
            ? This action cannot be undone.
          </>
        }
      />

      <ConfirmActionModal
        isOpen={isOpenEdit}
        closeAction={onCloseEdit}
        header={
          selectedCategory && selectedCategory.id === 'new'
            ? 'Create New Category'
            : 'Edit Category Information'
        }
        body={
          selectedCategory && (
            <EditCategoryForm
              category={selectedCategory}
              closeAction={onCloseEdit}
            />
          )
        }
        confirmButtonText={
          selectedCategory && selectedCategory.id === 'new' ? 'Create' : 'Save'
        }
        confirmButtonColor='blue'
        size='3xl'
        backgroundColor={useColorModeValue('gray.50', 'gray.800')}
      />
    </>
  )
}
