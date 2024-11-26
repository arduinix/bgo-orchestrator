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
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5'
import logo from '../../assets/image/logo_no_info.png'
import NavLinks, { NavLinkProps } from './NavLinks'
import { logout } from '@lib/auth/CognitoAuth'
import { FaRegChessPawn } from 'react-icons/fa6'

export interface TopNavigationProps {
  loggedIn: boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TopNavigation({ loggedIn }: TopNavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

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

  return (
    <>
      {/* <Box bg={useColorModeValue('gray.100', 'gray.900')} px={10} w="calc(100% + 197px)"> */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={10} w='100%'>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <IoClose /> : <RxHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box as='a' cursor={'pointer'} href={'/'}>
              <Image
                src={logo}
                alt='logo'
                boxSize='50px'
                ml={0}
                mr={0}
                objectFit={'scale-down'}
              />
            </Box>
            <Box as='a' cursor={'pointer'} href={'/'}>
              <Text fontSize={'xl'} as='b'>
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
            {loggedIn ? (
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
                  <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
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
            ) : (
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
                    bg={'orange.400'}
                    icon={<FaRegChessPawn fontSize={'2rem'} />}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => logout()}>Sign In</MenuItem>
                  <MenuItem>Help</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
