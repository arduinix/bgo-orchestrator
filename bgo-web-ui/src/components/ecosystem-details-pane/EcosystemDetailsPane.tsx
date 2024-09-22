import {
  Box,
  Text,
  Heading,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Ecosystem } from '../../types'
import EcosystemDetailsTabPanel from './EcosystemDetailsTabPanel'
import ecoSystems from '../../model_data/ecosystems.json'
import { ChevronDownIcon } from '@chakra-ui/icons'
const data: Ecosystem[] = ecoSystems

export default function EcosystemDetailsPane() {
  const { viewId } = useParams<{ viewId: string }>()
  const selectedEcosystem =
    data.find((ecoSystem) => ecoSystem.id === viewId) || null

  if (!selectedEcosystem) {
    return (
      <>
        <Box m={2}>
          <Text>Please select an ecosystem to view details.</Text>
        </Box>
      </>
    )
  }
  const { name, description, fTotalImages, fIdentifiedSpecies, createdDate } =
    selectedEcosystem
  return (
    <>
      <Box m={2}>
        <Card>
          <CardHeader>
            <Heading size="md">{name}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Description
                </Heading>
                <Text pt="2" fontSize="sm">
                  {description}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Stack direction="row" spacing="4" pt="2" wrap="wrap">
                  <Badge>Total Images: {fTotalImages}</Badge>
                  <Badge>Identified Species: {fIdentifiedSpecies}</Badge>
                  <Badge>Created Date: {createdDate}</Badge>
                </Stack>
              </Box>
              <Box>
                <EcosystemDetailsTabPanel ecosystem={selectedEcosystem} />
              </Box>
            </Stack>
          </CardBody>
          <CardFooter>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem color={'red'}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </CardFooter>
        </Card>
      </Box>
    </>
  )
}
