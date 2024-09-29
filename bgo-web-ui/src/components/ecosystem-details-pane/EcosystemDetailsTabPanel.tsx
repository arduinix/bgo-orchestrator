import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ListItem,
  UnorderedList,
  Box,
} from '@chakra-ui/react'
import { Ecosystem } from '../../types'

export default function EcosystemDetailsTabPanel({
  ecosystem,
}: {
  ecosystem: Ecosystem
}) {
  const {
    totalAcres,
    latitudeCenter,
    longitudeCenter,
    elevation,
    landOwner,
    outerEntity,
    county,
    country,
    state,
  } = ecosystem
  return (
    <Tabs>
      <TabList>
        <Tab>Map</Tab>
        <Tab>Geo</Tab>
        <Tab>Municipality</Tab>
      </TabList>
      <TabPanels>
        <TabPanel bg={'gray.50'}>
          <Box>Location Map Placeholder</Box>
        </TabPanel>
        <TabPanel bg={'gray.50'}>
          <UnorderedList>
            <ListItem>
              <b>Total Acres: </b>
              {totalAcres}
            </ListItem>
            <ListItem>
              <b>Latitude Center: </b>
              {latitudeCenter}
            </ListItem>
            <ListItem>
              <b>Longitude Center: </b>
              {longitudeCenter}
            </ListItem>
            <ListItem>
              <b>Elevation: </b>
              {elevation}
            </ListItem>
          </UnorderedList>
        </TabPanel>
        <TabPanel bg={'gray.50'}>
          <UnorderedList>
            <ListItem>
              <b>Land Owner: </b>
              {landOwner}
            </ListItem>
            <ListItem>
              <b>Outer Entity: </b>
              {outerEntity}
            </ListItem>
            <ListItem>
              <b>County: </b>
              {county}
            </ListItem>
            <ListItem>
              <b>State: </b>
              {state}
            </ListItem>
            <ListItem>
              <b>Country: </b>
              {country}
            </ListItem>
          </UnorderedList>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
