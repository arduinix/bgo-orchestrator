import {
  Box,
  Flex,
  FlexProps,
  Icon,
  Text,
  useMediaQuery,
  Tooltip,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

export interface LinkItemProps {
  name: string
  icon: IconType
  href: string | (() => void)
  tooltip?: string
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
  href: string | (() => void)
  toolTip?: string
}

export interface NavigationProps {
  linkItems: Array<LinkItemProps>
}

export default function Navigation({ linkItems }: NavigationProps) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  return (
    <>
      <Box pt={3} pr={3} w="20%">
        {linkItems.map(({ name, icon, href, tooltip }) => (
          <NavItem key={name} icon={icon} href={href} toolTip={tooltip}>
            {isLargerThan768 && (
              <Text fontSize={'lg'} fontWeight={'bold'}>
                {name}
              </Text>
            )}
          </NavItem>
        ))}
      </Box>
    </>
  )
}

const NavItem = ({ icon, href, children, toolTip }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={typeof href === 'string' ? href : undefined}
      onClick={typeof href === 'function' ? href : undefined}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Tooltip label={toolTip} aria-label={toolTip}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="md"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'gray.400',
            color: 'gray.100',
          }}
        >
          {icon && (
            <Icon
              mr="4"
              color="gray.400"
              fontSize="20"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Tooltip>
    </Box>
  )
}
