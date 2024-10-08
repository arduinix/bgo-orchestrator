import ReusableTabs from '../../components/reusable-tabs/ReuseableTabs'
import CategoriesTab from '@pages/olympics-manager/nested/CategoriesTab'

export default function OlympicsGames() {
  const tabs = [
    { label: 'Categories', content: <CategoriesTab /> },
    { label: 'Games', content: <p>Games</p> },
    { label: 'Tables', content: <p>Tables</p> },
  ]

  return <ReusableTabs tabs={tabs} />
}
