import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Flex,
  Select,
  FormLabel,
} from '@chakra-ui/react'
import games from '@data/games.json'

export default function RoundControlsCard() {
  const categories: GameCategory[] = games.catagories
  return (
    <Card variant={'filled'} size={'sm'}>
      <Box background={'white'} m={2}>
        <CardBody>
          <Flex>
            <Box display={'flex'}>
              <Text fontWeight={'bold'}>Select Category</Text>
              <Select>
                {categories.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
        </CardBody>
      </Box>
    </Card>
  )
}
