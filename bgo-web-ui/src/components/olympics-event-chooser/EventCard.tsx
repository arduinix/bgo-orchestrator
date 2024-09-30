import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Badge,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import torch from '../../assets/image/torch.png'

import ConfirmActionModal from '../confirm-action-modal/ConfirmActionModal'
import CopyToNewEventModal from '../copy-to-new-event/CopyToNewEventModal'
import { ListEvent } from '../../types'
import { convertDateShort } from '../../lib/util/stringConversion'

// interface CardProps {
//   heading: string;
//   description: string;
//   icon: ReactElement;
//   href: string;
// }

const EventCard = ({ id, name, location, playedDate }: ListEvent) => {
  const navigate = useNavigate()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const {
    isOpen: isOpenCopy,
    onOpen: onOpenCopy,
    onClose: onCloseCopy,
  } = useDisclosure()

  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={() => navigate(`/olympics/${id}`)}
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
            {/* <Icon as={FcDonate} w={10} h={10} /> */}
            <Image src={torch} boxSize={12} objectFit={'scale-down'} />
          </Flex>

          <Box mt={2}>
            <Heading size="md">{name}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {location}
            </Text>
            {playedDate ? (
              <Badge colorScheme="green">
                Played {convertDateShort(playedDate)}
              </Badge>
            ) : (
              <Badge colorScheme="purple">New</Badge>
            )}
          </Box>
        </Stack>
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<RxHamburgerMenu />}
          variant="outline"
        />
        <MenuList>
          <MenuItem>Open</MenuItem>
          <MenuItem onClick={onOpenCopy}>Copy to New</MenuItem>
          <MenuItem onClick={onOpenDelete}>Delete</MenuItem>
        </MenuList>
      </Menu>
      <ConfirmActionModal
        isOpen={isOpenDelete}
        closeAction={onCloseDelete}
        confirmAction={onCloseDelete}
        header={`Delete ${name}?`}
        body={`Are you sure that you want to delete this event named "${name}"? This action cannot be undone.`}
        confirmButtonText={'Delete'}
      />
      <CopyToNewEventModal
        isOpen={isOpenCopy}
        closeAction={onCloseCopy}
        confirmAction={onCloseCopy}
        sourceEventName={name}
      />
    </Box>
  )
}

export default EventCard
