import ReusableTabs from '../../components/reusable-tabs/ReuseableTabs'
import PlayersTab from './nested/PlayersTab'

export default function OlympicsRegistration() {
  const tabs = [
    { label: 'Players', content: <PlayersTab /> },
    { label: 'Invitations', content: <p>Invitations</p> },
  ]

  return <ReusableTabs tabs={tabs} />
}
