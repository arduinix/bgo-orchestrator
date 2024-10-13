import { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Box,
  Checkbox,
  Card,
  CardBody,
  chakra,
  Select,
} from '@chakra-ui/react'
import CustomQRCode from '@components/custom-qr-code/CustomQRCode'
import games from '../../../data/games.json'

const BoldFormLabel = chakra(FormLabel, {
  baseStyle: {
    fontWeight: 'bold',
    pl: 1,
    mb: 1,
  },
})

export interface EditGameFormProps {
  game: Game | null
  closeAction: () => void
}

export default function EditGameyForm({
  game,
  closeAction,
}: EditGameFormProps) {
  const categories: GameCategory[] = games.catagories
  const [currentGame, setCurrentGame] = useState<Game | null>(null)

  useEffect(() => {
    setCurrentGame(game)
  }, [game])

  const handleFieldUpdate = (key: string, value: string | boolean) => {
    if (currentGame) {
      setCurrentGame({
        ...currentGame,
        [key]: value,
      })
    }
  }

  const { name, description, isInPlay } = currentGame || {}

  return (
    <>
      {currentGame && (
        <Card position={'relative'}>
          <CardBody>
            <Box position='absolute' top={4} right={4}>
              <CustomQRCode url='https://www.google.com' />
            </Box>
            <Box position='absolute' top={170} right={10}>
              <Checkbox
                size={'lg'}
                isChecked={isInPlay}
                onChange={(e) =>
                  handleFieldUpdate('isInPlay', e.target.checked)
                }
              >
                In Play
              </Checkbox>
            </Box>
            <FormControl gap={4} flexDir={'column'}>
              <Flex gap={4} width={'100%'} flexDirection={'column'}>
                <Box width={'69%'}>
                  <BoldFormLabel>Name</BoldFormLabel>
                  <Input
                    type='text'
                    value={name || ''}
                    onChange={(e) => handleFieldUpdate('name', e.target.value)}
                  />
                </Box>
                <Box width={'70%'}>
                  <BoldFormLabel>Description</BoldFormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) =>
                      handleFieldUpdate('description', e.target.value)
                    }
                  />
                </Box>

                <Box>
                  <BoldFormLabel>Category</BoldFormLabel>
                  <Select>
                    {categories.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <BoldFormLabel>Completion Time (avg)</BoldFormLabel>
                 
                </Box>





                <Box>
                  <Checkbox
                    size={'lg'}
                    isChecked={isInPlay}
                    onChange={(e) =>
                      handleFieldUpdate('lowScoreWins', e.target.checked)
                    }
                  >
                    Low Score Wins
                  </Checkbox>
                </Box>

                <Flex gap={2}></Flex>
              </Flex>
            </FormControl>
          </CardBody>
        </Card>
      )}
    </>
  )
}
