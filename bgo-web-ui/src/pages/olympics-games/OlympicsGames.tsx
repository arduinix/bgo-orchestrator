import ReusableTabs from '../../components/reusable-tabs/ReuseableTabs'

export default function OlympicsGames() {
  const tabs = [
    { label: 'Categories', content: <p>Categories</p> },
    { label: 'Games', content: <p>Games</p> },
    { label: 'Tables', content: <p>Tables</p> },
    { label: 'Import', content: <p>Import</p> },
  ]

  return <ReusableTabs tabs={tabs} />
}
