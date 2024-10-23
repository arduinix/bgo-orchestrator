import ReusableTabs from '../../components/reusable-tabs/ReuseableTabs'

export default function OlympicsRounds() {
  const tabs = [
    { label: 'Rounds', content: <p>Rounds</p> },
  ]
  return <ReusableTabs tabs={tabs} />
}
