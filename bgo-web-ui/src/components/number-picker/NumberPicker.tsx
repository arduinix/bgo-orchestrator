import { Flex, NumberInput } from '@chakra-ui/react'

import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input'

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
      <NumberInputRoot
        defaultValue='0'
        min={min}
        max={max}
        // onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
        allowMouseWheel
        {...rest}
      >
        <NumberInputField
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      </NumberInputRoot>
    </Flex>
  )
}
