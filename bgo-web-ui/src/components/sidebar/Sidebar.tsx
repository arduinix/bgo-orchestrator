import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Tooltip,
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

export interface LinkItemProps {
  name: string
  icon: IconType
  href: string
  tooltip?: string
}

export default function SimpleSidebar({
  linkItems,
}: {
  linkItems: Array<LinkItemProps>
}) {
  const { open, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={'gray.100'}>
      <SidebarContent
        linkItems={linkItems}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={open}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent linkItems={linkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}></Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  linkItems: Array<LinkItemProps>
  onClose: () => void
}

const SidebarContent = ({ onClose, linkItems, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={'white'}
      borderRight="1px"
      borderRightColor={'gray.200'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="0" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map(({ tooltip, name, icon, href }) => (
        <Tooltip key={name} label={tooltip} aria-label={tooltip}>
          <NavItem icon={icon} href={href}>
            {name}
          </NavItem>
        </Tooltip>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  href: string
  children: ReactText
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Box
      onClick={() => navigate(href)}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={location && location.pathname === href ? 'cyan.200' : undefined}
        color={location && location.pathname === href ? 'gray.800' : undefined}
        _hover={{
          bg: 'cyan.500',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="18"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      // bg={useColorModeValue('white', 'gray.900')}
      bg={'white'}
      borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      borderBottomColor={'gray.200'}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}
