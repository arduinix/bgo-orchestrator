import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

export default function OlympicsGames() {
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Categories</Tab>
        <Tab>Games</Tab>
        <Tab>Import</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Categories</p>
        </TabPanel>
        <TabPanel>
          <p>Games</p>
        </TabPanel>
        <TabPanel>
          <p>Import</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
