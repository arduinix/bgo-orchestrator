import { Icon, IconProps } from '@chakra-ui/react'
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'

export const TrueIcon = ({
  alignSelf = 'center',
  boxSize = 6,
  color = 'green.500',
  ...rest
}: IconProps) => {
  return (
    <Icon
      alignSelf={alignSelf}
      boxSize={boxSize}
      as={FaCircleCheck}
      color={color}
      {...rest}
    />
  )
}

export const FalseIcon = ({
  alignSelf = 'center',
  boxSize = 6,
  color = 'red.500',
  ...rest
}: IconProps) => {
  return (
    <Icon
      alignSelf={alignSelf}
      boxSize={boxSize}
      as={FaCircleXmark}
      color={color}
      {...rest}
    />
  )
}
