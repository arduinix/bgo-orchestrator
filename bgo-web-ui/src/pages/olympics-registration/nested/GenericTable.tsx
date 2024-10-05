import React, { useState, ReactNode } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  Flex,
  Text,
  useColorMode,
  Box,
} from '@chakra-ui/react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';

interface SortConfig<T> {
  key: keyof T;
  direction: 'ascending' | 'descending';
}

export interface TableHeader<T> {
  text: string | ReactNode;
  sortKey: keyof T | null;
}

interface GenericTableProps<T> {
  data: T[];
  headers: TableHeader<T>[];
  selectedRow?: T | null;
  handleDeleteClick?: (row: T) => void;
  handleEditClick?: (row: T) => void;
  setSelectedRow?: (row: T) => void;
}

export default function GenericTable<T extends Record<string, any>>({
  data,
  headers,
  selectedRow,
  handleDeleteClick,
  handleEditClick,
  setSelectedRow,
}: GenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);
  
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'gray.700' : 'white';
  const textColor = colorMode === 'dark' ? 'white' : 'black';
  const subTextColor = colorMode === 'dark' ? 'gray.100' : 'gray.500';
  const headerBgColor = colorMode === 'dark' ? 'gray.800' : 'gray.100';
  const selectedBgColor = colorMode === 'dark' ? 'blue.900' : 'blue.100';

  const handleSort = (key: keyof T) => {
    let direction: 'ascending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof T) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />;
    }
    return null;
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...data].sort((a, b) => {
        const key = sortConfig.key;
        const direction = sortConfig.direction === 'ascending' ? 1 : -1;
        const aKey = a[key];
        const bKey = b[key];

        if (aKey == null || bKey == null) return 0;
        return aKey < bKey ? -1 * direction : aKey > bKey ? 1 * direction : 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                onClick={header.sortKey !== null ? () => handleSort(header.sortKey as keyof T) : undefined}
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
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((row, index) => (
            <Tr
              key={index}
              bg={selectedRow && row === selectedRow ? selectedBgColor : bgColor}
              onClick={() => setSelectedRow && setSelectedRow(row)}
              cursor="pointer"
            >
              {headers.map((header, i) => (
                <Td key={i} color={textColor}>
                  {typeof row[header.sortKey as keyof T] !== 'undefined' && row[header.sortKey as keyof T]}
                </Td>
              ))}
              <Td>
                <Flex gap={2}>
                  {handleEditClick && (
                    <IconButton
                      size={'sm'}
                      aria-label="edit row"
                      icon={<FiEdit />}
                      onClick={() => handleEditClick(row)}
                    />
                  )}
                  {handleDeleteClick && (
                    <IconButton
                      size={'sm'}
                      aria-label="delete row"
                      icon={<FiTrash2 />}
                      onClick={() => handleDeleteClick(row)}
                    />
                  )}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
