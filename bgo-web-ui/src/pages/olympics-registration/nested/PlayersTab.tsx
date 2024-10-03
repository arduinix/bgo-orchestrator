import { Button, ButtonGroup, Input, Flex, Spacer } from '@chakra-ui/react'
import PlayersTable from './PlayersTable'

export default function PlayersTab() {
  return (
    <>
      <Flex flexDirection={'column'} gap={4}>
        <ButtonGroup colorScheme="blue" size={'md'}>
          <Button>Import CSV</Button>
          <Button>Import Player Group</Button>
          <Spacer />
          <Button>Add Player</Button>
        </ButtonGroup>

        <Input placeholder="Search players" />
        <PlayersTable />
      </Flex>
    </>
  )
}
