import React, { useState, ReactNode, useMemo } from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Flex,
  Text,
  useColorMode,
  Box,
} from '@chakra-ui/react'
import { SystemStyleObject } from '@chakra-ui/styled-system'
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa'
import { TrueIcon, FalseIcon } from '@components/standards/StandardIcons'
import SearchInput from '@components/search-input/SearchInput'
import PaginationControl from '@components/pagination-control/PaginationControl'

interface SortConfig<T> {
  key: keyof T
  direction: 'ascending' | 'descending'
}

export interface TableHeader<T> {
  text: string | ReactNode
  sortKey: keyof T | null // The key to sort and search by if there is no showKey
  cellStyle?: SystemStyleObject
  subFieldStyle?: SystemStyleObject
  showKey?: keyof T | null // The key of the field to show in the table cell
  subField?: keyof T | null // A secondary field to be rendered as subtext under the main field
}

interface GenericTableProps<T> {
  data: T[]
  headers: TableHeader<T>[]
  selectedRow?: T | null
  setSelectedRow?: (row: T) => void
  enableMultiSelect?: boolean
  multiSelectKeyExtractor?: (row: T) => string
  rowActionButtons?: (row: T) => ReactNode
  noRecordsMessage?: string | ReactNode
  disableSearch?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GenericTable<T extends Record<string, any>>({
  data,
  headers,
  selectedRow,
  setSelectedRow,
  enableMultiSelect,
  multiSelectKeyExtractor,
  rowActionButtons,
  noRecordsMessage = 'No items found matching the search criteria.',
  disableSearch = false,
}: GenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const handleRowsPerPageChange = (numberOfItems: number) => {
    setRowsPerPage(numberOfItems)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleRowCheckboxChange = (key: string) => {
    setSelectedRows((prevSelectedRows: string[]) =>
      prevSelectedRows.includes(key)
        ? prevSelectedRows.filter((rowKey) => rowKey !== key)
        : ([...prevSelectedRows, key] as string[])
    )
  }

  const handleHeaderCheckboxChange = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([])
    } else {
      if (multiSelectKeyExtractor) {
        setSelectedRows(data.map((row) => multiSelectKeyExtractor(row)))
      }
    }
  }

  const isAllSelected = selectedRows.length === data.length
  const { colorMode } = useColorMode()
  const bgColor = colorMode === 'dark' ? 'gray.700' : 'white'
  const textColor = colorMode === 'dark' ? 'white' : 'black'
  const subTextColor = colorMode === 'dark' ? 'gray.100' : 'gray.500'
  const headerBgColor = colorMode === 'dark' ? 'gray.800' : 'gray.100'
  const selectedBgColor = colorMode === 'dark' ? 'blue.900' : 'blue.100'

  const handleSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof T) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? (
        <FaSortAlphaDown />
      ) : (
        <FaSortAlphaDownAlt />
      )
    }
    return null
  }

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.keys(item).some(
        (key) =>
          item[key] &&
          item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredData].sort((a, b) => {
        const key = sortConfig.key
        const direction = sortConfig.direction === 'ascending' ? 1 : -1
        const aKey = a[key]
        const bKey = b[key]

        if (aKey == null || bKey == null) return 0
        return aKey < bKey ? -1 * direction : aKey > bKey ? 1 * direction : 0
      })
    }
    return filteredData
  }, [filteredData, sortConfig])

  const paginatedData = useMemo(() => {
    return sortedData.slice(indexOfFirstRow, indexOfLastRow)
  }, [sortedData, indexOfFirstRow, indexOfLastRow])

  const renderTableRowField = (
    value: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    cellStyle: SystemStyleObject
  ): ReactNode => {
    if (typeof value === 'boolean') {
      return value ? <TrueIcon /> : <FalseIcon />
    } else if (typeof value === 'string' || typeof value === 'number') {
      return (
        <Text color={textColor} sx={cellStyle}>
          {value}
        </Text>
      )
    } else if (React.isValidElement(value)) {
      return value
    } else {
      return null
    }
  }

  const renderSubField = (
    value: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    subFieldStyle: SystemStyleObject
  ): ReactNode => {
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <Text color={subTextColor} sx={subFieldStyle}>
          {value}
        </Text>
      )
    } else {
      return null
    }
  }

  return (
    <>
      {!disableSearch && (
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchChange={handleSearchChange}
        />
      )}
      <TableContainer maxWidth={'100%'}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {enableMultiSelect && (
                <Th
                  key={'selectAllRows'}
                  bg={headerBgColor}
                  color={textColor}
                  textAlign="left"
                  fontWeight="bold"
                  fontSize={'sm'}
                  p={4}
                >
                  <Checkbox
                    size={'lg'}
                    bg={'white'}
                    ml={2}
                    isChecked={isAllSelected}
                    onChange={handleHeaderCheckboxChange}
                  />
                </Th>
              )}
              {headers.map((header, index) => (
                <Th
                  key={index}
                  onClick={
                    header.sortKey !== null
                      ? () => handleSort(header.sortKey as keyof T)
                      : undefined
                  }
                  cursor={header.sortKey ? 'pointer' : 'default'}
                  bg={headerBgColor}
                  color={textColor}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={'sm'}
                  p={4}
                >
                  <Flex>
                    <Box mr={2}>{header.text}</Box>
                    <Box>{header.sortKey && getSortIcon(header.sortKey)}</Box>
                  </Flex>
                </Th>
              ))}
              <Th
                bg={headerBgColor}
                color={textColor}
                textAlign="center"
                fontWeight="bold"
                fontSize={'sm'}
                p={4}
              />
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.length === 0 ? (
              <Tr>
                <Td
                  colSpan={
                    enableMultiSelect
                      ? data.length > 0
                        ? Object.keys(data[0]).length + 1
                        : headers.length + 1
                      : data.length > 0
                        ? Object.keys(data[0]).length
                        : headers.length
                  }
                  textAlign="center"
                >
                  {noRecordsMessage}
                </Td>
              </Tr>
            ) : (
              paginatedData.map((row, index) => {
                const key = multiSelectKeyExtractor
                  ? multiSelectKeyExtractor(row)
                  : ''
                return (
                  <Tr
                    key={index}
                    bg={
                      selectedRow && row === selectedRow
                        ? selectedBgColor
                        : bgColor
                    }
                    onClick={() => setSelectedRow && setSelectedRow(row)}
                    cursor="pointer"
                  >
                    {enableMultiSelect && (
                      <Td>
                        <Checkbox
                          size={'lg'}
                          bg={'white'}
                          isChecked={selectedRows.includes(key)}
                          onChange={() => handleRowCheckboxChange(key)}
                        />
                      </Td>
                    )}
                    {headers.map((header, i) => (
                      <Td key={i} color={textColor}>
                        <Flex flexDirection={'column'}>
                          {renderTableRowField(
                            row[
                              header.showKey
                                ? header.showKey
                                : (header.sortKey as keyof T)
                            ],
                            header.cellStyle as SystemStyleObject
                          )}
                          {header.subField &&
                            renderSubField(
                              row[header.subField as keyof T],
                              header.subFieldStyle as SystemStyleObject
                            )}
                        </Flex>
                      </Td>
                    ))}
                    {rowActionButtons && <Td>{rowActionButtons(row)}</Td>}
                  </Tr>
                )
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <PaginationControl
        totalPages={totalPages}
        itemsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onItemsPerPageChange={handleRowsPerPageChange}
      />
    </>
  )
}