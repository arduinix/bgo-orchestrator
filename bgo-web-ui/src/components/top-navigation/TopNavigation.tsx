import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Image,
  Switch,
  useColorMode,
  Spacer,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import torch from '../../assets/image/torch.png'
import NavLinks, { NavLinkProps } from './NavLinks'






const navLinks: Array<NavLinkProps> = [
  {
    name: 'Tutorials',
    href: '/tutorials',
    tooltip: 'Learn how to create and run a BGO event.',
  },
  { name: 'Olympics', href: '/olympics', tooltip: 'Manage your BGO events.' },
  {
    name: 'Leagues',
    href: '/leagues',
    tooltip: 'Create, join and manage league play.',
  },
  {
    name: 'Player Groups',
    href: '/playergroups',
    tooltip: 'Manage your player groups and teams.',
  },
]

export interface TopNavigationProps {
  loggedIn: boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TopNavigation({ loggedIn }: TopNavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={10}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box as="a" cursor={'pointer'} href={'/'}>
              <Image src={torch} alt="logo" boxSize="50px" ml={0} mr={0} />
            </Box>
            <Box as="a" cursor={'pointer'} href={'/'}>
              <Text fontSize={'xl'} as="b">
                BOARD GAME OLYMPICS
              </Text>
            </Box>

            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {/* {Links.map((link) => (
                <NavLink key={link}>
                  <Text fontSize={"xl"}>{link}</Text>
                </NavLink>
              ))} */}
              <NavLinks navLinks={navLinks} />
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'md'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Sign Out</MenuItem>
                <MenuItem>Change Account</MenuItem>
                <MenuDivider />
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Help</MenuItem>
                <MenuItem>
                  <Flex width={'100%'}>
                    <Text mr={4}>Dark Mode</Text>
                    <Spacer />
                    <Switch
                      onChange={toggleColorMode}
                      checked={colorMode === 'dark'}
                    />
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
