import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from '@chakra-ui/react'

export interface NumberPickerProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function NumberPicker({
  value,
  onChange,
  min = 0,
  max = 100,
  ...rest
}: NumberPickerProps) {
  return (
    <Flex alignItems={'center'}>
      <NumberInput
        value={value}
        min={min}
        max={max}
        onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
        allowMouseWheel
        {...rest}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  )
}
