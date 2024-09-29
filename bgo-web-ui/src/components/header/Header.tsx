import TopNavigation from '../top-navigation/TopNavigation'
export interface HeaderProps {
  loggedIn: boolean
}

export default function Header({ loggedIn }: HeaderProps) {
  return (
    <>
      <TopNavigation loggedIn={loggedIn} />
    </>
  )
}
