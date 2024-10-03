import players from '../../../data/players.json'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  IconButton,
} from '@chakra-ui/react'

import { FiTrash2 } from 'react-icons/fi'

export default function PlayersTable() {
  const data = players.players as Player[]
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Player Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Playing</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ id, fName, mInit, lName, email, phone, isPlaying }) => (
            <Tr key={id}>
              <Td>{`${fName} ${mInit ? `${mInit}.` : ''} ${lName}`}</Td>
              <Td>{email}</Td>
              <Td>{phone}</Td>
              <Td>
                <Checkbox size={'lg'} isChecked={isPlaying} />
              </Td>
              <Td>
                <IconButton
                  size={'sm'}
                  aria-label="delete player"
                  icon={<FiTrash2 />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
