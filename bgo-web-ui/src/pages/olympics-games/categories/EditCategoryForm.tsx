import { useState, useEffect } from 'react'
import {
  Input,
  Textarea,
  Flex,
  Box,
  Card,
} from '@chakra-ui/react'
import { BoldFormLabel } from '@/components/styled-components/StyledComponents'
import { Checkbox } from '@components/ui/checkbox'
import CustomQRCode from '@components/custom-qr-code/CustomQRCode'
import ColorPickerDropdown from '@components/color-picker-dropdown/ColorPickerDropdown'


export interface EditCategoryFormProps {
  category: GameCategory | null
  closeAction: () => void
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
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
        <Card.Root position={'relative'}>
          <Card.Body>
            <Box position='absolute' top={4} right={4}>
              <CustomQRCode url='https://www.google.com' />
            </Box>
            <Flex gap={4} flexDir={'column'}>
              <Flex gap={4} width={'100%'} flexDirection={'column'}>
                <Flex gap={10}>
                  <Box width={'44%'}>
                    <BoldFormLabel>Category Name</BoldFormLabel>
                    <Input
                      type='text'
                      value={name || ''}
                      onChange={(e) =>
                        handleFieldUpdate('name', e.target.value)
                      }
                    />
                  </Box>
                  <Box minWidth={'30%'}>
                    <BoldFormLabel>Category Color</BoldFormLabel>
                    <ColorPickerDropdown />
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
                  <Box width={'30%'} alignSelf={'flex-end'} pl={20} pb={3}>
                    <Checkbox
                      size={'lg'}
                      checked={isInPlay}
                      onChange={(e) =>
                        handleFieldUpdate('isInPlay', e.target.checked)
                      }
                    >
                      In Play
                    </Checkbox>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Card.Body>
        </Card.Root>
      )}
    </>
  )
}
