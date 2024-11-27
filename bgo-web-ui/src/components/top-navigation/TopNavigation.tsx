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
import { FaRegChessPawn } from 'react-icons/fa6'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

export default function TopNavigation() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, authStatus, signOut, toSignIn } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
    context.signOut,
    context.toSignIn,
  ])

  console.log('authStatus:', authStatus)
  console.log('toSignIn:', toSignIn)


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

          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {/* {Links.map((link) => (
                <NavLink key={link}>
                  <Text fontSize={"xl"}>{link}</Text>
                </NavLink>
              ))} */}
            <NavLinks navLinks={navLinks} />
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          {authStatus === 'authenticated' ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'md'} name={user?.username} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
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
                <MenuItem onClick={() => navigate('/signin')}>Sign In</MenuItem>
                <MenuItem>Help</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
