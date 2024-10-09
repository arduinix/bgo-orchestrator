import ReusableTabs from '@components/reusable-tabs/ReuseableTabs'
import CategoriesTab from '@pages/olympics-games/categories/CategoriesTab'
import GamesTab from './games/GamesTab'

export default function OlympicsGames() {
  const tabs = [
    { label: 'Categories', content: <CategoriesTab /> },
    { label: 'Games', content: <GamesTab /> },
    { label: 'Tables', content: <p>Tables</p> },
  ]

  return <ReusableTabs tabs={tabs} />
}
