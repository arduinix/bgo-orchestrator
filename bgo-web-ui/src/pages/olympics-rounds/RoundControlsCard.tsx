import {
  Card,
  CardBody,
  Text,
  Box,
  Flex,
  Select,
  Button,
  Tooltip,
} from '@chakra-ui/react'
import games from '@data/games.json'
import { GiChoice } from 'react-icons/gi'
import NumberPicker from '@/components/number-picker/NumberPicker'
import RoundTimer from './RoundTimer'

export default function RoundControlsCard() {
  const categories: GameCategory[] = games.catagories
  return (
    <Card variant={'filled'} size={'sm'}>
      <Box background={'white'} m={1}>
        <CardBody>
          <Flex
            alignItems={'center'}
            m={-1}
            gap={2}
            justifyContent={'space-between'}
          >
            <Flex
              borderWidth={'1px'}
              borderColor={'gray.100'}
              alignItems={'center'}
              gap={2}
            >
              <Box display={'flex'} alignItems={'center'} m={1} mr={1} ml={2}>
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
              <Tooltip label={'Automatically pick the round category'}>
                <Button size={'md'} mr={2} rightIcon={<GiChoice />}>
                  Auto Pick
                </Button>
              </Tooltip>
            </Flex>
            <Flex
              borderWidth={'1px'}
              borderColor={'gray.100'}
              alignItems={'center'}
              gap={2}
            >
              <Box display={'flex'} alignItems={'center'} m={1} mr={2}>
                <Text
                  fontWeight={'bold'}
                  sx={{ whiteSpace: 'nowrap' }}
                  m={1}
                  mr={2}
                  ml={2}
                >
                  Tables:
                </Text>
                <NumberPicker value={1} onChange={() => {}} />
              </Box>
            </Flex>

            <RoundTimer />
          </Flex>
        </CardBody>
      </Box>
    </Card>
  )
}
