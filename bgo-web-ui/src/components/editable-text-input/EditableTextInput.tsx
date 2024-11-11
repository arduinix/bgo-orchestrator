import { useState, useEffect, useRef } from 'react'
import {
  Input,
  Text,
  useColorModeValue,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react'

interface EditableTextInputProps {
  initialValue?: string | number
  onValueChange?: (value: string | number | null) => void
}

export default function EditableTextInput({
  initialValue,
  onValueChange,
}: EditableTextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string | number | null>(
    initialValue ?? null
  )
  const [error, setError] = useState<string | null>(null)

  const handleTextClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === '') {
      setValue(null)
      setError(null)
      return
    }
    setValue(inputValue)
    if (!isNaN(Number(inputValue))) {
      setValue(Number(inputValue))
      setError(null)
    } else {
      setError('Please enter a valid number')
    }
  }

  const handleInputBlur = () => {
    setIsEditing(false)
    if (onValueChange) {
      onValueChange(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select()
    }
  }, [isEditing])

  return (
    <>
      {isEditing ? (
        <FormControl isInvalid={!!error}>
          <Input
            ref={inputRef}
            width={'6ch'}
            size={'sm'}
            pl={1}
            pr={1}
            placeholder='-'
            value={value ?? ''}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            type='number'
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      ) : (
        <Text
          color={useColorModeValue('#206CAF', '#3ca4ff')}
          fontWeight={'bold'}
          onClick={handleTextClick}
          width={'5ch'}
        >
          {value ?? '-'}
        </Text>
      )}
    </>
  )
}
