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
  MenuDivider,
  useDisclosure,
  Badge,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import torch from '@assets/image/torch.png'
import ConfirmActionModal from '@components/confirm-action-modal/ConfirmActionModal'
import { convertDate } from '@utils/stringConversion'

// interface CardProps {
//   heading: string;
//   description: string;
//   icon: ReactElement;
//   href: string;
// }

const OlympicsRoundCard = ({
  id,
  phase,
  createdTimestamp,
  completedTimestamp,
  roundNumber,
}: SortedRound) => {
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

  // const handleEventClick = () => {
  //   navigate(`/olympics/${id}`)
  // }

  return (
    <Box
      maxW={{ base: 'full', md: '285px' }}
      w={'full'}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      onClick={() => handleEventClick()}
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
            <Heading size='md'>Round {roundNumber}</Heading>
            {/* <Text mt={1} fontSize={'sm'}>
              {location}
            </Text> */}
            {createdTimestamp ? (
              <Badge colorScheme='green'>
                Created {convertDate(createdTimestamp)}
              </Badge>
            ) : (
              <Badge colorScheme='purple'>New</Badge>
            )}
          </Box>
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
          // onClick={(e) => {
          //   e.stopPropagation()
          //   handleEventClick()
          // }}
          >
            Open
          </MenuItem>
          <MenuItem
          // onClick={(e) => {
          //   e.stopPropagation()
          //   handleEventClick()
          // }}
          >
            Start
          </MenuItem>
          <MenuItem
          // onClick={(e) => {
          //   e.stopPropagation()
          //   handleEventClick()
          // }}
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
        header={`Remove ${name}?`}
        body={`Are you sure that you want to round named "${name}"?.`}
        confirmButtonText={'Delete'}
      />
    </Box>
  )
}

export default OlympicsRoundCard
