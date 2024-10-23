import ReusableTabs from '@components/reusable-tabs/ReuseableTabs'
import OlympicsRoundChooser from './rounds/OlympicsRoundChooser'

export default function OlympicsRounds() {
  const tabs = [
    { label: 'Rounds', content: <OlympicsRoundChooser /> },
  ]
  return <ReusableTabs tabs={tabs} />
}
