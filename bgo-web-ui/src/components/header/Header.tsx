import {
  Switch,
  Tooltip,
  Box,
  Flex,
  useColorMode,
  IconButton,
} from '@chakra-ui/react'
import { PiDoorOpenBold } from 'react-icons/pi'
import { signOut } from '@aws-amplify/auth'
import TopNavigation from '../top-navigation/TopNavigation'

export interface HeaderProps {
  loggedIn: boolean
}

export default function Header({ loggedIn }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      {/* <Flex alignItems="center" height="100%" p="10" justifyContent="flex-end">
        <Box mr={5}>
          <Tooltip label="Toggle light/dark mode">
            <Switch
              onChange={toggleColorMode}
              checked={colorMode === 'light'}
            />
          </Tooltip>
        </Box>

        <Box>
          {loggedIn && (
            <Tooltip label="Logout">
              <IconButton
                aria-label="Logout"
                icon={<PiDoorOpenBold />}
                onClick={() => signOut()}
                size={'lg'}
                variant={'ghost'}
              />
            </Tooltip>
          )}
        </Box>
      </Flex> */}

<TopNavigation />

    </>
  )
}
