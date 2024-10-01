import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

export default function OlympicsRegistration() {
  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Players</Tab>
        <Tab>Invitations</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Players</p>
        </TabPanel>
        <TabPanel>
          <p>Invitations</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
