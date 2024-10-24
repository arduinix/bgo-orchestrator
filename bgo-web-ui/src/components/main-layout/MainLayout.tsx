import { Box, Flex } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import Home from '../../pages/home/Home'

export default function MainLayout() {
  const location = useLocation()

  // const linkItems: Array<LinkItemProps> = [
  //   {
  //     name: "Event Mechanics",
  //     icon: LuTrees,
  //     href: "/olympics/eventmechanics",
  //     tooltip: "Adjust event mechanics and rules.",
  //   },
  //   {
  //     name: "Player Management",
  //     icon: LuSettings,
  //     href: "/olympics/playermanagement",
  //     tooltip: "Manage player registration and participation.",
  //   },
  //   {
  //     name: "Dashboards",
  //     icon: LuHome,
  //     href: "/olympics/dashboards",
  //     tooltip: "View event statistics and analytics.",
  //   }
  // ];

  // create an object to hold link items for

  return (
    <Flex
      direction="column"
      position="absolute"
      width="100%"
      height="100%"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Flex overflow="scroll">
        {/* <Navigation linkItems={linkItems} /> */}
        <Box p={4} w="100%" flexGrow={1} overflow="scroll">
          {location.pathname === '/' ? <Home /> : <Outlet />}
        </Box>
      </Flex>
    </Flex>
  )
}
