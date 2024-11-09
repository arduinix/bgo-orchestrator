import {
  Card,
  CardBody,
  Text,
  Box,
  Flex,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import games from '@data/games.json'
import { GiChoice } from 'react-icons/gi'
import NumberPicker from '@/components/number-picker/NumberPicker'
import { FaPlay, FaStop, FaChevronDown } from 'react-icons/fa'
import RoundTimer from './RoundTimer'

export default function RoundControlsCard() {
  const categories: GameCategory[] = games.catagories
  return (
    <Card variant={'filled'} size={'sm'}>
      <Box background={'white'} m={1}>
        <CardBody>
          <Flex alignItems={'center'} m={-1} gap={2}>
            <Flex
              borderWidth={'1px'}
              borderColor={'gray.100'}
              alignItems={'center'}
              gap={2}
            >
              <Box display={'flex'} alignItems={'center'}   m={1} mr={1} ml={2}>
                <Text fontWeight={'bold'} sx={{ whiteSpace: 'nowrap' }} mr={2}>
                  Select Category:
                </Text>
                <Select justifySelf={'flex-end'}>
                  {categories.map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Button size={'md'} mr= {2} rightIcon={<GiChoice />}>
                Auto Pick
              </Button>
            </Flex>
            <Flex
              borderWidth={'1px'}
              borderColor={'gray.100'}
              alignItems={'center'}
              gap={2}
            >
              <Box display={'flex'} alignItems={'center'} m={1} mr={2}>
                <Text fontWeight={'bold'} sx={{ whiteSpace: 'nowrap' }} m={1} mr={2} ml={2}>
                  Tables:
                </Text>
                <NumberPicker value={1} onChange={() => {}} />
              </Box>
            </Flex>
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                Match Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Auto Create All</MenuItem>
                <MenuItem>Assign All Benched Players</MenuItem>
                <MenuItem>Create New Match</MenuItem>
                <MenuItem>Delete Select Match</MenuItem>
              </MenuList>
            </Menu>

            <IconButton
              colorScheme='red'
              aria-label='stop'
              icon={<FaStop />}
              variant={'outline'}
            />
            <IconButton
              colorScheme='green'
              aria-label='start'
              icon={<FaPlay />}
              variant={'outline'}
              // set up so the if playing the variant is solid
            />
            <RoundTimer />
          </Flex>
        </CardBody>
      </Box>
    </Card>
  )
}
