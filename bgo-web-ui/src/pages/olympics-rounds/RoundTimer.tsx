import { useState, useEffect } from 'react'
import { Box, IconButton, Text, Flex, Tooltip } from '@chakra-ui/react'
import { FaPlay, FaStop } from 'react-icons/fa'

export default function RoundTimer() {
  const [time, setTime] = useState<number>(0)
  // const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isRunning] = useState<boolean>(false)

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

  // const handleStart = (): void => {
  //   setIsRunning(true)
  // }

  // const handleStop = (): void => {
  //   setIsRunning(false)
  // }

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
      pl={2}
      pr={2}
    >
      <Box display={'flex'} alignItems={'center'} m={1} mr={2} gap={2}>
        <Text fontWeight={'bold'} sx={{ whiteSpace: 'nowrap' }}>
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
          <Text fontSize={'2xl'} fontWeight={'bold'} fontFamily={'monospace'}>
            {formatTime(time)}
          </Text>
        </Box>
      </Box>
      <Tooltip label='Stop Round'>
        <IconButton
          colorScheme='red'
          aria-label='stop'
          icon={<FaStop />}
          variant={'outline'}
        />
      </Tooltip>
      <Tooltip label='Start Round'>
        <IconButton
          colorScheme='green'
          aria-label='start'
          icon={<FaPlay />}
          variant={'outline'}
          // set up so the if playing the variant is solid
        />
      </Tooltip>
    </Flex>
  )
}
