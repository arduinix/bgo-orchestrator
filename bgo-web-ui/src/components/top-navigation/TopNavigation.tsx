import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  MenuSeparator,
  useDisclosure,
  Image,
  Switch,
  Spacer,
} from '@chakra-ui/react'
import {
  MenuRoot,
  MenuItem,
  MenuContent,
  MenuTrigger,
} from '@components/ui/menu'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5'

import logo from '../../assets/image/logo_no_info.png'
import NavLinks, { NavLinkProps } from './NavLinks'

export interface TopNavigationProps {
  loggedIn: boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TopNavigation({ loggedIn }: TopNavigationProps) {
  const { open, onOpen, onClose } = useDisclosure()
  // const { colorMode, toggleColorMode } = useColorMode()

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
      <Box bg={'gray.100'} px={10}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={open ? onClose : onOpen}
          >
            {open ? <IoClose /> : <RxHamburgerMenu />}
          </IconButton>

          <HStack gap={8} alignItems={'center'}>
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

            <HStack as={'nav'} gap={4} display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link}>
                  <Text fontSize={"xl"}>{link}</Text>
                </NavLink>
              ))} */}
              <NavLinks navLinks={navLinks} />
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <MenuRoot>
              <MenuTrigger
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
              </MenuTrigger>
              <MenuContent>
                <MenuItem value='sign-out'>Sign Out</MenuItem>
                <MenuItem value='change-account'>Change Account</MenuItem>
                <MenuSeparator />
                <MenuItem value='account-settings'>Account Settings</MenuItem>
                <MenuItem value='help'>Help</MenuItem>
                <MenuItem value='dark-mode'>
                  <Flex width={'100%'}>
                    <Text mr={4}>Dark Mode</Text>
                    <Spacer />
                    <Switch
                    // onChange={toggleColorMode}
                    // checked={colorMode === 'dark'}
                    />
                  </Flex>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
