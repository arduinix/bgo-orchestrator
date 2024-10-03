import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

export default function OlympicsMechanics() {
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Scoring</Tab>
        <Tab>Rounds</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Scoring</p>
        </TabPanel>
        <TabPanel>
          <p>Rounds</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
