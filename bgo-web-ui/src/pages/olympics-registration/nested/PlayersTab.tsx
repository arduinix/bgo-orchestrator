import { Button, ButtonGroup, Input, Flex } from '@chakra-ui/react'
import PlayersTable from './PlayersTable'

export default function PlayersTab() {
  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <ButtonGroup colorScheme="blue" size={'md'}>
          <Button>Import CSV</Button>
          <Button>Import Player Group</Button>
        </ButtonGroup>
        <Input placeholder="Search players" />
        <PlayersTable />
      </Flex>
    </>
  )
}
