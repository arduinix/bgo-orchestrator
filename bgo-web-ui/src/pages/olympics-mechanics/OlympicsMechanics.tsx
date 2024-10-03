import ReusableTabs from '../../components/reusable-tabs/ReuseableTabs'

export default function OlympicsMechanics() {
  const tabs = [
    { label: 'Scoring', content: <p>Scoring</p> },
    { label: 'Rounds', content: <p>Rounds</p> },
  ]
  return <ReusableTabs tabs={tabs} />
}
