import { useState, useEffect } from 'react'
import {
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box,
  Checkbox,
  Card,
  CardBody,
  chakra,
} from '@chakra-ui/react'
import { formatPlayerName } from '@utils/stringConversion'
import AvatarNameFlex from '@components/avatar-name-flex/AvatarNameFlex'

const BoldFormLabel = chakra(FormLabel, {
  baseStyle: {
    fontWeight: 'bold',
    pl: 1,
    mb: 1,
  },
})

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
        <Card>
          <CardBody>
            <Flex gap={4} flexDir={'column'}>
              <AvatarNameFlex player={currentPlayer} />

              <FormControl>
                <Flex gap={4} width={'100%'} flexDirection={'column'}>
                  <Flex gap={10}>
                    <Box width={'44%'}>
                      <BoldFormLabel>Nick Name</BoldFormLabel>
                      <Input type="text" value={nickName} />
                    </Box>
                    <Box width={'20%'} alignSelf={'center'} mt={7}>
                      <Checkbox size={'lg'} isChecked={isPlaying}>
                        Playing?
                      </Checkbox>
                    </Box>
                  </Flex>

                  <Flex gap={2}>
                    <Box width={'45%'}>
                      <BoldFormLabel>First Name</BoldFormLabel>
                      <Input type="text" value={fName} />
                    </Box>
                    <Box width={'10%'}>
                      <BoldFormLabel>Initial</BoldFormLabel>
                      <Input type="text" value={mInit || ''} />
                    </Box>
                    <Box width={'45%'}>
                      <BoldFormLabel>Last Name</BoldFormLabel>
                      <Input type="text" value={lName} />
                    </Box>
                  </Flex>
                  <Flex gap={2}>
                    <Box width={'50%'}>
                      <BoldFormLabel>Phone</BoldFormLabel>
                      <Input type="text" value={phone} />
                    </Box>
                    <Box width={'50%'}>
                      <BoldFormLabel>Email address</BoldFormLabel>
                      <Input type="email" value={email} />
                    </Box>
                  </Flex>
                </Flex>
              </FormControl>
            </Flex>
          </CardBody>
        </Card>
      )}
    </>
  )
}
