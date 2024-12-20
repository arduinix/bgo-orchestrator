import { Box, useColorModeValue, Tooltip, Text } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface NavLinkProps {
  name: string
  href: string
  tooltip?: string
}
export interface NavLinkItems {
  navLinks: Array<NavLinkProps>
}

const NavLink = ({ name, href, tooltip }: NavLinkProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive =
    typeof href === 'string' && location.pathname.startsWith(href)
  const hoverBg = useColorModeValue('gray.300', 'gray.700')

  return (
    <Tooltip label={tooltip} aria-label={tooltip}>
      <Box
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'underline',
          bg: hoverBg,
          cursor: 'pointer',
        }}
        bg={isActive ? hoverBg : undefined}
        textDecoration={isActive ? 'underline' : 'none'}
        onClick={() => navigate(href)}
      >
        <Text fontSize={'xl'}>{name}</Text>
      </Box>
    </Tooltip>
  )
}

const NavLinks = ({ navLinks }: NavLinkItems) => {
  return (
    <>
      {navLinks.map(({ href, tooltip, name }) => (
        <NavLink key={name} name={name} href={href} tooltip={tooltip} />
      ))}
    </>
  )
}

export default NavLinks
