import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Checkbox,
  Divider,
  Center,
} from '@chakra-ui/react'
import { Ecosystem } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import EcosystemTable from '../../components/ecosystem-table/EcosystemTable'
import ecoSystems from '../../model_data/ecosystems.json'
import EcosystemDetailsPane from '../../components/ecosystem-details-pane/EcosystemDetailsPane'
const data: Ecosystem[] = ecoSystems

export default function Ecosystems() {
  const navigate = useNavigate()
  const { viewId } = useParams<{ viewId: string }>()
  useEffect(() => {
    if (data && data.length > 0 && !viewId) {
      navigate('/ecosystems/' + data[0].id)
    }
  })
  return (
    <>
      <Heading size={'lg'}>Ecosystems</Heading>
      <Flex mt={3}>
        <Box width={'65%'} m={2}>
          <Flex m={2}>
            {!data || data.length === 0 ? (
              <Text>
                There are no ecosystems to display. Please create a new
                ecosystem.
              </Text>
            ) : (
              <EcosystemTable data={data} />
            )}
          </Flex>
          <Flex
            gap={4}
            mr={4}
            justifyContent={'flex-end'}
            flexDirection={'row'}
          >
            <Checkbox>Show Removed</Checkbox>
            <Button colorScheme="blue">New Ecosystem</Button>
          </Flex>
        </Box>
        <Center>
          <Divider orientation="vertical" />
        </Center>
        <Box width={'35%'} m={2} background={'gray.50'}>
          <EcosystemDetailsPane />
        </Box>
      </Flex>
    </>
  )
}
