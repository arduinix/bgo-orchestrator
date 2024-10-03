import { useParams, Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import Sidebar, { LinkItemProps } from '../../components/sidebar/Sidebar'
import {
  GiPerspectiveDiceSixFacesOne,
  GiGears,
} from 'react-icons/gi'
import { LuWrench } from "react-icons/lu";
import { RiQrCodeFill } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { FaUserSecret } from 'react-icons/fa6'
export default function OlympicsManager() {
  const { id } = useParams()
  const route = `/olympics/${id}`

  const linkItems: Array<LinkItemProps> = [
    {
      name: 'Registration',
      icon: FaUserSecret,
      href: `${route}/registration`,
      // tooltip: 'Register players and manage player information.',
    },
    {
      name: 'Games & Tables',
      icon: GiPerspectiveDiceSixFacesOne,
      href: `${route}/games`,
      // tooltip: 'Set up games and player tables.',
    },
    {
      name: 'Mechanics',
      icon: LuWrench,
      href: `${route}/mechanics`,
      // tooltip: 'Set up games and player tables.',
    },
    {
      name: 'Printables',
      icon: RiQrCodeFill,
      href: `${route}/printables`,
      // tooltip: 'Manage event resources and printable materials.',
    },
    {
      name: 'Dashboards',
      icon: RxDashboard,
      href: `${route}/dashboards`,
      // tooltip: 'View event statistics and analytics.',
    },
    {
      name: 'Settings',
      icon: GiGears,
      href: `${route}/settings`,
      // tooltip: 'View event statistics and analytics.',
    },
  ]

  return (
    <>
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
          <Sidebar linkItems={linkItems} />
          <Flex p={4} w="100%" flexGrow={1} overflow="scroll">
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
