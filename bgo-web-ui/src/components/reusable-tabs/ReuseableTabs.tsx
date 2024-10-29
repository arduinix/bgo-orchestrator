import React from 'react'
import { Tabs, Box } from '@chakra-ui/react'

interface ReusableTabsProps {
  tabs: { label: string; content: React.ReactNode }[]
}

const ReusableTabs: React.FC<ReusableTabsProps> = ({ tabs }) => {
  return (
    <Tabs.Root size='md' variant='enclosed'>
      <Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Trigger key={index} value={tab.label}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Box p={2}>
        {tabs.map((tab, index) => (
          <Tabs.Content key={index} value={tab.label}>
            {tab.content}
          </Tabs.Content>
        ))}
      </Box>
    </Tabs.Root>
  )
}

export default ReusableTabs
