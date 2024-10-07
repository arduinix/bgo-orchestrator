import {
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'

export interface SearchInputProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  handleSearchChange,
}: SearchInputProps) {
  return (
    <InputGroup width={'50%'} mb={1}>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <InputRightElement>
        <Tooltip label="Clear search">
          <IconButton
            aria-label="clear search"
            size={'md'}
            fontSize={20}
            icon={<IoMdClose />}
            onClick={() => setSearchTerm('')}
          />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  )
}
