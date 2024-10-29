import { Button, IconButton, Flex } from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi'

import { useState } from 'react'

interface PaginationControlProps {
  totalPages: number
  itemsPerPage: number
  currentPage: number
  onItemsPerPageChange: (items: number) => void
  setCurrentPage: (page: number) => void
  itemsPerPageList?: number[]
}

export default function PaginationControl({
  totalPages,
  itemsPerPage,
  currentPage,
  onItemsPerPageChange,
  setCurrentPage,
  itemsPerPageList = [10, 20, 50, 100],
}: PaginationControlProps) {
  const [itemsPerPageOptions] = useState(itemsPerPageList)
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Flex alignItems='center' alignSelf={'center'} gap={8}>
      <Tooltip content='First Page'>
        <IconButton
          bg='transparent'
          aria-label='First Page'
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <FiChevronsLeft />
        </IconButton>
      </Tooltip>
      <Tooltip content='Previous Page'>
        <IconButton
          bg='transparent'
          aria-label='Previous Page'
          onClick={() => handlePreviousPage()}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </IconButton>
      </Tooltip>
      <Tooltip content='Current Page'>
        <Button background={'transparent'}>{currentPage}</Button>
      </Tooltip>
      <Tooltip content='Next Page'>
        <IconButton
          bg='transparent'
          aria-label='Next Page'
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </IconButton>
      </Tooltip>
      <Tooltip content='Last Page'>
        <IconButton
          bg='transparent'
          aria-label='Last Page'
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <FiChevronsRight />
        </IconButton>
      </Tooltip>
      <SelectRoot
        width={'70px'}
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {itemsPerPageOptions.map((option) => (
            <SelectItem key={option} item={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Flex>
  )
}
