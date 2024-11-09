import { useState, useEffect } from 'react'
import { Box, Button, Text, Flex } from '@chakra-ui/react'

export default function RoundTimer() {
  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (!isRunning && time !== 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const handleStart = (): void => {
    setIsRunning(true)
  }

  const handleStop = (): void => {
    setIsRunning(false)
  }

  const formatTime = (time: number): string => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <Flex
      borderWidth={'1px'}
      borderColor={'gray.100'}
      alignItems={'center'}
      gap={2}
    >
      <Box display={'flex'} alignItems={'center'} m={1} mr={2}>
        <Text
          fontWeight={'bold'}
          sx={{ whiteSpace: 'nowrap' }}
          m={1}
          mr={2}
          ml={2}
        >
          Round Time:
        </Text>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyItems={'center'}
          borderWidth={'1px'}
          borderColor={'gray.100'}
          borderRadius={'md'}
          boxShadow={'sm'}
          background={'gray.50'}
          color={'green.600'}
        >
          <Text
            fontSize={'2xl'}
            fontWeight={'bold'}
            fontFamily={'monospace'}
            m={1}
          >
            {formatTime(time)}
          </Text>
          {/* <Button
        colorScheme={isRunning ? 'red' : 'green'}
        onClick={isRunning ? handleStop : handleStart}
      >
        {isRunning ? 'Stop' : 'Start'}
      </Button> */}
        </Box>
      </Box>
    </Flex>
  )
}
