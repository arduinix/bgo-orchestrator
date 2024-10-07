import React, { useState, ReactNode } from 'react'
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
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa'
import { TrueIcon, FalseIcon } from '@components/standards/StandardIcons'

interface SortConfig<T> {
  key: keyof T
  direction: 'ascending' | 'descending'
}

export interface TableHeader<T> {
  text: string | ReactNode
  sortKey: keyof T | null
  subField?: keyof T | null
}

interface GenericTableProps<T> {
  data: T[]
  headers: TableHeader<T>[]
  selectedRow?: T | null
  setSelectedRow?: (row: T) => void
  enableMultiSelect?: boolean
  multiSelectKeyExtractor?: (row: T) => string
  rowActionButtons?: (row: T) => ReactNode
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
}: GenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

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

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...data].sort((a, b) => {
        const key = sortConfig.key
        const direction = sortConfig.direction === 'ascending' ? 1 : -1
        const aKey = a[key]
        const bKey = b[key]

        if (aKey == null || bKey == null) return 0
        return aKey < bKey ? -1 * direction : aKey > bKey ? 1 * direction : 0
      })
    }
    return data
  }, [data, sortConfig])

  return (
    <TableContainer>
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
          {sortedData.map((row, index) => {
            const key = multiSelectKeyExtractor
              ? multiSelectKeyExtractor(row)
              : ''
            return (
              <Tr
                key={index}
                bg={
                  selectedRow && row === selectedRow ? selectedBgColor : bgColor
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
                      {typeof row[header.sortKey as keyof T] === 'boolean' ? (
                        row[header.sortKey as keyof T] ? (
                          <TrueIcon />
                        ) : (
                          <FalseIcon />
                        )
                      ) : (
                        <Text>
                          {typeof row[header.sortKey as keyof T] !==
                            'undefined' && row[header.sortKey as keyof T]}
                        </Text>
                      )}
                      {header.subField && (
                        <Text fontSize={'sm'} color={subTextColor}>
                          {typeof row[header.subField as keyof T] !==
                            'undefined' && row[header.subField as keyof T]}
                        </Text>
                      )}
                    </Flex>
                  </Td>
                ))}
                {rowActionButtons && <Td>{rowActionButtons(row)}</Td>}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}