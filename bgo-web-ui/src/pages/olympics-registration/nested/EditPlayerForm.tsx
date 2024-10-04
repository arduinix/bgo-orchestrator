import { useState, useEffect } from 'react'
import {
  Avatar,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Flex,
  Box,
  Stack,
  VStack,
  HStack,
  Spacer,
  Checkbox,
} from '@chakra-ui/react'
import { formatPlayerName } from '@utils/stringConversion'

// const formatPlayerName = (player: Player, includeMiddle: boolean = true) => {
//   const { fName, mInit, lName } = player
//   if (includeMiddle) {
//     return `${fName} ${mInit ? `${mInit}.` : ''} ${lName}`
//   }
//   return `${fName} ${lName}`
// }

export interface EditPlayerFormProps {
  player: Player
  closeAction: () => void
}

export default function EditPlayerForm({
  player,
  closeAction,
}: EditPlayerFormProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    setCurrentPlayer(player)
  }, [player])

  const handleUpdatePlayer = (key: string, value: string | boolean) => {
    if (currentPlayer) {
      setCurrentPlayer({
        ...currentPlayer,
        [key]: value,
      })
    }
  }

  const { fName, mInit, lName, nickName, imagePath, phone, email, isPlaying } =
    currentPlayer || {}

  return (
    <>
      {currentPlayer && (
        <Flex gap={4} flexDir={'column'}>
          <Flex
            height="100%"
            width="100%"
            justifyContent="start"
            alignItems="center"
          >
            <Flex flexDirection="row" gap={4}>
              <Avatar
                name={formatPlayerName(currentPlayer)}
                src={imagePath}
                size="lg"
              />
              <Text fontSize="lg" fontWeight="bold" alignSelf="center">
                {formatPlayerName(currentPlayer)}
              </Text>
            </Flex>
          </Flex>
          <FormControl>
            <Flex gap={6} width={'100%'} flexDirection={'column'}>
              <Flex gap={10}>
                <Box>
                  <FormLabel>Nick Name</FormLabel>
                  <Input type="text" value={nickName} />
                </Box>
                <Box width={'20%'} alignSelf={'center'} mt={7}>
                  <Checkbox size={'lg'} isChecked={isPlaying}>
                    Playing?
                  </Checkbox>
                </Box>
              </Flex>

              <Flex gap={2}>
                <Box width={'42%'}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={fName} />
                </Box>
                <Box width={'16%'}>
                  <FormLabel>Middle Initial</FormLabel>
                  <Input type="text" value={mInit || ''} />
                </Box>
                <Box width={'42%'}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" value={lName} />
                </Box>
              </Flex>
              <Flex gap={2}>
                <Box width={'50%'}>
                  <FormLabel>Phone</FormLabel>
                  <Input type="text" value={phone} />
                </Box>
                <Box width={'50%'}>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={email} />
                </Box>
              </Flex>
            </Flex>
          </FormControl>
        </Flex>
      )}
    </>
  )
}
