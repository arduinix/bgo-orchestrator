import { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Checkbox,
  Card,
  CardBody,
  chakra,
} from '@chakra-ui/react'
import AvatarNameFlex from '@components/avatar-name-flex/AvatarNameFlex'
import CustomQRCode from '@components/custom-qr-code/CustomQRCode'

const BoldFormLabel = chakra(FormLabel, {
  baseStyle: {
    fontWeight: 'bold',
    pl: 1,
    mb: 1,
  },
})

export interface EditPlayerFormProps {
  player: Player | null
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

  const handleFieldUpdate = (key: string, value: string | boolean) => {
    if (currentPlayer) {
      setCurrentPlayer({
        ...currentPlayer,
        [key]: value,
      })
    }
  }

  const { fName, mInit, lName, nickName, phone, email, isPlaying } =
    currentPlayer || {}

  return (
    <>
      {currentPlayer && (
        <Card position={'relative'}>
          <CardBody>
            <Box position="absolute" top={4} right={4}>
              <CustomQRCode url="https://www.google.com" />
            </Box>
            <Flex gap={4} flexDir={'column'}>
              <AvatarNameFlex player={currentPlayer} />
              <FormControl>
                <Flex gap={4} width={'100%'} flexDirection={'column'}>
                  <Flex gap={10}>
                    <Box width={'44%'}>
                      <BoldFormLabel>Nick Name</BoldFormLabel>
                      <Input
                        type="text"
                        value={nickName || ''}
                        onChange={(e) =>
                          handleFieldUpdate('nickName', e.target.value)
                        }
                      />
                    </Box>
                    <Box width={'20%'} alignSelf={'center'} mt={7}>
                      <Checkbox
                        size={'lg'}
                        isChecked={isPlaying}
                        onChange={(e) =>
                          handleFieldUpdate('isPlaying', e.target.checked)
                        }
                      >
                        Playing?
                      </Checkbox>
                    </Box>
                  </Flex>
                  <Flex gap={2}>
                    <Box width={'45%'}>
                      <BoldFormLabel>First Name</BoldFormLabel>
                      <Input
                        type="text"
                        value={fName}
                        onChange={(e) =>
                          handleFieldUpdate('fName', e.target.value)
                        }
                      />
                    </Box>
                    <Box width={'10%'}>
                      <BoldFormLabel>Initial</BoldFormLabel>
                      <Input
                        type="text"
                        value={mInit || ''}
                        onChange={(e) =>
                          handleFieldUpdate('mInit', e.target.value)
                        }
                      />
                    </Box>
                    <Box width={'45%'}>
                      <BoldFormLabel>Last Name</BoldFormLabel>
                      <Input
                        type="text"
                        value={lName}
                        onChange={(e) =>
                          handleFieldUpdate('lName', e.target.value)
                        }
                      />
                    </Box>
                  </Flex>
                  <Flex gap={2}>
                    <Box width={'50%'}>
                      <BoldFormLabel>Phone</BoldFormLabel>
                      <Input
                        type="text"
                        value={phone}
                        onChange={(e) =>
                          handleFieldUpdate('phone', e.target.value)
                        }
                      />
                    </Box>
                    <Box width={'50%'}>
                      <BoldFormLabel>Email Address</BoldFormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          handleFieldUpdate('email', e.target.value)
                        }
                      />
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
