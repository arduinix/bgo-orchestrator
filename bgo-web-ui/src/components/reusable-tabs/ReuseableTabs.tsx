import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs, Box } from '@chakra-ui/react'

interface ReusableTabsProps {
  tabs: { label: string; content: React.ReactNode }[]
}

const ReusableTabs: React.FC<ReusableTabsProps> = ({ tabs }) => {
  return (
    <Tabs size='lg' variant='enclosed-colored' colorScheme='blue'>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab fontWeight={'bold'} key={index}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <Box p={2}>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </Box>
    </Tabs>
  )
}

export default ReusableTabs
