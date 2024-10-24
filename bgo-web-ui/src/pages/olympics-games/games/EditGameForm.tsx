import { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Box,
  Card,
  CardBody,
  chakra,
  Select,
} from '@chakra-ui/react'
import { Checkbox } from '@components/ui/checkbox'
import CustomQRCode from '@components/custom-qr-code/CustomQRCode'
import NumberPicker from '@components/number-picker/NumberPicker'
import games from '@data/games.json'

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
}: EditGameFormProps) {
  const categories: GameCategory[] = games.catagories
  const [currentGame, setCurrentGame] = useState<Game | null>(null)

  useEffect(() => {
    setCurrentGame(game)
  }, [game])

  const handleFieldUpdate = (key: string, value: string | number | boolean) => {
    if (currentGame) {
      setCurrentGame({
        ...currentGame,
        [key]: value,
      })
    }
  }

  const {
    name,
    description,
    isInPlay,
    averageCompletionMinutes,
    minPlayers,
    maxPlayers,
  } = currentGame || {}

  return (
    <>
      {currentGame && (
        <Card position={'relative'}>
          <CardBody>
            <Box position='absolute' top={4} right={4}>
              <CustomQRCode url='https://www.google.com' />
            </Box>
            <Box position='absolute' top={160} right={10}>
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
                <Flex gap={4} width={'100%'}>
                  <Box width={'73%'}>
                    <BoldFormLabel>Category</BoldFormLabel>
                    <Select>
                      {categories.map(({ id, name }) => (
                        <option key={id} value={name}>
                          {name}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box width={'26%'}>
                    <BoldFormLabel>Play Time (minutes)</BoldFormLabel>
                    <NumberPicker
                      value={averageCompletionMinutes || 0}
                      onChange={(value) =>
                        handleFieldUpdate('averageCompletionMinutes', value)
                      }
                    />
                  </Box>
                </Flex>

                <Box width={'28%'}>
                  <BoldFormLabel>Players</BoldFormLabel>
                  <Flex alignItems={'center'}>
                    <NumberPicker
                      value={minPlayers || 0}
                      onChange={(value) =>
                        handleFieldUpdate('minPlayers', value)
                      }
                    />
                    <FormLabel ml={3} pt={2}>
                      TO
                    </FormLabel>
                    <NumberPicker
                      value={maxPlayers || 0}
                      onChange={(value) =>
                        handleFieldUpdate('maxPlayers', value)
                      }
                    />
                  </Flex>
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
