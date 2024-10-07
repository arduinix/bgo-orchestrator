import { Button, IconButton, Tooltip, Select, Flex } from '@chakra-ui/react'

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
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
  itemsPerPageList?: number[]
}

export default function PaginationControl({
  totalPages,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageList = [10, 20, 50, 100],
}: PaginationControlProps) {
  const [itemsPerPageOptions] = useState(itemsPerPageList)
  const  pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Flex alignItems="center" alignSelf={'center'} gap={8}>
      <Tooltip label="First Page">
        <IconButton
          icon={<FiChevronsLeft />}
          bg="transparent"
          aria-label="First Page"
          onClick={() => onPageChange(1)}
          isDisabled={currentPage === 1}
        />
      </Tooltip>
      <Tooltip label="Previous Page">
        <IconButton
          icon={<FiChevronLeft />}
          bg="transparent"
          aria-label="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        />
      </Tooltip>
      <Tooltip label="Current Page">
        <Button background={'transparent'}>{currentPage}</Button>
      </Tooltip>
      <Tooltip label="Next Page">
        <IconButton
          icon={<FiChevronRight />}
          bg="transparent"
          aria-label="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        />
      </Tooltip>
      <Tooltip label="Last Page">
        <IconButton
          icon={<FiChevronsRight />}
          bg="transparent"
          aria-label="Last Page"
          onClick={() => onPageChange(totalPages)}
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
