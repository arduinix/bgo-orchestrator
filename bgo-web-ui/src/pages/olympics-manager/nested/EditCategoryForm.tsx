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
} from '@chakra-ui/react'
import CustomQRCode from '@components/custom-qr-code/CustomQRCode'

const BoldFormLabel = chakra(FormLabel, {
  baseStyle: {
    fontWeight: 'bold',
    pl: 1,
    mb: 1,
  },
})

export interface EditCategoryFormProps {
  category: GameCategory | null
  closeAction: () => void
}

export default function EditCategoryForm({
  category,
  closeAction,
}: EditCategoryFormProps) {
  const [currentCategory, setCurrentCategory] = useState<GameCategory | null>(
    null
  )

  useEffect(() => {
    setCurrentCategory(category)
  }, [category])


  const handleFieldUpdate = (key: string, value: string | boolean) => {
    if (currentCategory) {
      setCurrentCategory({
        ...currentCategory,
        [key]: value,
      })
    }
  }

  const { name, description, isInPlay } = currentCategory || {}

  return (
    <>
      {currentCategory && (
        <Card position={'relative'}>
          <CardBody>
            <Box position="absolute" top={4} right={4}>
              <CustomQRCode url="https://www.google.com" />
            </Box>
            <Flex gap={4} flexDir={'column'}>
              <FormControl>
                <Flex gap={4} width={'100%'} flexDirection={'column'}>
                  <Flex gap={10}>
                    <Box width={'44%'}>
                      <BoldFormLabel>Category Name</BoldFormLabel>
                      <Input
                        type="text"
                        value={name || ''}
                        onChange={(e) =>
                          handleFieldUpdate('name', e.target.value)
                        }
                      />
                    </Box>
                    
                  </Flex>
                  <Flex gap={2}>
                    <Box width={'70%'}>
                      <BoldFormLabel>Description</BoldFormLabel>
                      <Textarea
                        value={description}

                        onChange={(e) =>
                          handleFieldUpdate('description', e.target.value)
                        }
                      />
                    </Box>
                    <Box width={'30%'} alignSelf={'flex-end'} pt={7} pl={8}>
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
