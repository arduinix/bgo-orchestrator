const Button = {
  baseStyle: {
    color: 'white',
    rounded: 'full',
    fontWeight: 'normal',
    px: 6,
    size: 'lg',
    _disabled: {
      backgroundColor: 'gray.100',
      borderColor: 'gray.300',
      color: 'gray.300',
      _hover: {
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    blue: {
      bg: 'blue.400',
      _hover: {
        bg: 'blue.500',
      },
    },
    blueOutline: {
      bg: 'gray.100',
      color: 'blue.400',
      _hover: {
        bg: 'gray.200',
      },
    },
    red: {
      bg: 'red.400',
      _hover: {
        bg: 'red.500',
      },
    },
  },
  defaultProps: {
    variant: 'blue',
  },
}

export default Button
