import { useState } from 'react'
import { Button, Box, Flex } from '@chakra-ui/react'
import {
  MenuRoot,
  MenuItem,
  MenuContent,
  MenuTrigger,
} from '@components/ui/menu'
import { GoChevronDown } from 'react-icons/go'
import selectableColors from '@constants/selectableColors'

export default function ColorPickerDropdown() {
  const [selectedColor, setSelectedColor] = useState<CategoryColor | null>(null)

  const handleColorChange = (color: CategoryColor | null) => {
    setSelectedColor(color)
  }

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button as={Button}>
          <Flex alignItems='center'>
            <Box
              width='16px'
              height='16px'
              backgroundColor={selectedColor?.hex}
              outline={'1px solid gray'}
              borderRadius='50%'
              marginRight='8px'
            />
            {selectedColor ? selectedColor.name : 'None'}
            <Flex marginLeft='auto'>
              <GoChevronDown />
            </Flex>
          </Flex>
        </Button>
      </MenuTrigger>
      <MenuContent maxHeight='175px' overflowY='auto'>
        <MenuItem onClick={() => handleColorChange(null)} value='none'>
          <Flex alignItems='center'>
            <Box
              width='16px'
              height='16px'
              backgroundColor='transparent'
              outline={'1px solid gray'}
              borderRadius='50%'
              marginRight='8px'
            />
            None
          </Flex>
        </MenuItem>
        {selectableColors.map((color) => (
          <MenuItem
            key={color.name}
            onClick={() => handleColorChange(color)}
            value='color-name'
          >
            <Flex alignItems='center'>
              <Box
                width='16px'
                height='16px'
                backgroundColor={color.hex}
                outline={'1px solid gray'}
                borderRadius='50%'
                marginRight='8px'
              />
              {color.name}
            </Flex>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
