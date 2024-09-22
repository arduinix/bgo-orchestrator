import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Ecosystem } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'

export interface EcosystemTableProps {
  data: Ecosystem[]
}

export default function EcosystemTable({ data }: EcosystemTableProps) {
  const navigate = useNavigate()
  const { viewId } = useParams<{ viewId: string }>()
  return (
    <TableContainer m={2}>
      <Table colorScheme="gray">
        <TableCaption>Select an Ecosystem to see more details.</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Outer Location</Th>
            <Th>Total Images</Th>
            <Th>Identified Species</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(
            (
              { id, name, outerEntity, fTotalImages, fIdentifiedSpecies },
              index
            ) => (
              <Tr
                key={id}
                onClick={() => navigate(`/ecosystems/${id}`)}
                bg={
                  viewId === id
                    ? 'blue.100'
                    : index % 2 === 0
                    ? 'gray.200'
                    : 'white'
                }
                _hover={{ bg: 'blue.200' }}
              >
                <Td>{name}</Td>
                <Td>{outerEntity}</Td>
                <Td>{fTotalImages}</Td>
                <Td>{fIdentifiedSpecies}</Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
