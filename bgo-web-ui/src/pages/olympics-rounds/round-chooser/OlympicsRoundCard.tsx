import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Image,
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Badge,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import torch from '@assets/image/torch.png'
import ConfirmActionModal from '@components/confirm-action-modal/ConfirmActionModal'
import { elapsedSinceDate } from '@utils/stringConversion'

const OlympicsRoundCard = ({
  id: roundId,
  phase,
  createdTimestamp,
  completedTimestamp,
  startedTimestamp,
  roundNumber,
}: Round) => {
  const navigate = useNavigate()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const handleRoundClick = () => {
    navigate(`./${roundId}`)
  }

  const PhaseBadge = () => {
    const phaseMapping: { [key: string]: { color: string; text: string } } = {
      setup: { color: 'red', text: 'Setup required' },
      ready: { color: 'yellow', text: 'Ready to play' },
      playing: { color: 'green', text: 'Playing' },
      complete: { color: 'blue', text: 'Complete' },
    }
    const { color, text } = phaseMapping[phase]

    return (
      <Badge variant={'solid'} colorScheme={color}>
        {text}
      </Badge>
    )
  }

  const roundTimestampText = () => {
    if (completedTimestamp) {
      return `Completed ${elapsedSinceDate(completedTimestamp)}`
    } else if (startedTimestamp) {
      return `Started ${elapsedSinceDate(startedTimestamp)}`
    }
    return `Created ${elapsedSinceDate(createdTimestamp)}`
  }

  return (
    <Box
      maxW={{ base: 'full', md: '285px' }}
      w={'full'}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      onClick={() => handleRoundClick()}
      p={5}
      display={'flex'}
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <Box flex={'1'}>
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            <Image src={torch} boxSize={12} objectFit={'scale-down'} />
          </Flex>
          <Flex mt={2} gap={2} alignItems={'flex-start'} flexDir={'column'}>
            <Heading size='md'>Round {roundNumber}</Heading>
            <Box>
              <Badge whiteSpace={'normal'} wordBreak={'break-word'}>
                {roundTimestampText()}
              </Badge>
            </Box>
            <PhaseBadge />
          </Flex>
        </Stack>
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<RxHamburgerMenu />}
          variant='outline'
          onClick={(e) => e.stopPropagation()}
        />
        <MenuList>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            Open
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            Start
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            Declare Finished
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
              onOpenDelete()
            }}
          >
            Remove Round
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
              onOpenDelete()
            }}
          >
            Undo Remove
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmActionModal
        isOpen={isOpenDelete}
        closeAction={onCloseDelete}
        confirmAction={onCloseDelete}
        header={`Remove round ${roundNumber}?`}
        body={`Are you sure that you want to Round "${roundNumber}"?. Note that round numbers are ordered based on creation time. If a round is removed, the round number will be replaced by the next round in the order.`}
        confirmButtonText={'Delete'}
      />
    </Box>
  )
}

export default OlympicsRoundCard
