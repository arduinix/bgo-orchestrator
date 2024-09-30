import { useParams } from 'react-router-dom'
import Sidebar, { LinkItemProps } from '../../components/sidebar/Sidebar'
import { GiPerspectiveDiceSixFacesOne, GiTimeBomb } from 'react-icons/gi'
import { RiQrCodeFill } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { FaUserSecret } from 'react-icons/fa6'
export default function EventEditor() {
  const { id } = useParams()

  const linkItems: Array<LinkItemProps> = [
    {
      name: 'Registration',
      icon: FaUserSecret,
      href: `/olympics/${id}/registration`,
      tooltip: 'Register players and manage player information.',
    },
    {
      name: 'Games & Tables',
      icon: GiPerspectiveDiceSixFacesOne,
      href: `/olympics/${id}/games`,
      tooltip: 'Set up games and player tables.',
    },
    {
      name: 'Rounds',
      icon: GiTimeBomb,
      href: `/olympics/${id}/rounds`,
      tooltip: 'Start and stop rounds edit scores',
    },
    {
      name: 'Event Resources',
      icon: RiQrCodeFill,
      href: `/olympics/${id}/resources`,
      tooltip: 'Manage event resources and printable materials.',
    },
    {
      name: 'Dashboards',
      icon: RxDashboard,
      href: `/olympics/${id}/dashboards`,
      tooltip: 'View event statistics and analytics.',
    },
  ]

  return (
    <>
      <Sidebar linkItems={linkItems} />
      <h1>EventEditor Placeholder</h1>
      <h2>Event ID: {id}</h2>
    </>
  )
}
