import {
  Input,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  IconButton,
  Tooltip,
  Icon,
} from '@chakra-ui/react'
import { IoMdClose, IoMdSearch } from 'react-icons/io'

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
      <InputLeftElement>
        <Icon as={IoMdSearch} color="gray.300" fontSize={25} />
      </InputLeftElement>
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
