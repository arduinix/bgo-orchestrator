import { Button, IconButton, Select, Flex } from '@chakra-ui/react'
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
          icon={<FiChevronsLeft />}
          bg='transparent'
          aria-label='First Page'
          onClick={() => setCurrentPage(1)}
          isDisabled={currentPage === 1}
        />
      </Tooltip>
      <Tooltip content='Previous Page'>
        <IconButton
          icon={<FiChevronLeft />}
          bg='transparent'
          aria-label='Previous Page'
          onClick={() => handlePreviousPage()}
          isDisabled={currentPage === 1}
        />
      </Tooltip>
      <Tooltip content='Current Page'>
        <Button background={'transparent'}>{currentPage}</Button>
      </Tooltip>
      <Tooltip content='Next Page'>
        <IconButton
          icon={<FiChevronRight />}
          bg='transparent'
          aria-label='Next Page'
          onClick={() => handleNextPage()}
          isDisabled={currentPage === totalPages}
        />
      </Tooltip>
      <Tooltip content='Last Page'>
        <IconButton
          icon={<FiChevronsRight />}
          bg='transparent'
          aria-label='Last Page'
          onClick={() => setCurrentPage(totalPages)}
          isDisabled={currentPage === totalPages}
        />
      </Tooltip>
      <Select
        width={'70px'}
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
      >
        {itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
