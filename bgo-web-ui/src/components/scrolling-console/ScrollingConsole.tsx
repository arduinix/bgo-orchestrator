import React, { useRef, useEffect } from 'react'
import { Box, useTheme } from '@chakra-ui/react'

interface ConsoleProps {
  logs: string[]
}

export default function ScrollingConsole({ logs }: ConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [logs])

  return (
    <Box m={4}>
      <Box
        ref={consoleRef}
        overflowY='scroll'
        h='200px'
        p={3}
        fontFamily={theme.fonts.mono}
        whiteSpace='pre-wrap'
        border='1px solid'
        borderColor='gray.300'
        borderRadius='md'
      >
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </Box>
    </Box>
  )
}
