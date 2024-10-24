import { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react'
import { GoChevronDown } from 'react-icons/go'
import selectableColors from '@constants/selectableColors'

export default function ColorPickerDropdown() {
  const [selectedColor, setSelectedColor] = useState<CategoryColor | null>(null)

  const handleColorChange = (color: CategoryColor | null) => {
    setSelectedColor(color)
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<GoChevronDown />}>
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
        </Flex>
      </MenuButton>
      <MenuList maxHeight='175px' overflowY='auto'>
        <MenuItem onClick={() => handleColorChange(null)}>
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
          <MenuItem key={color.name} onClick={() => handleColorChange(color)}>
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
      </MenuList>
    </Menu>
  )
}
