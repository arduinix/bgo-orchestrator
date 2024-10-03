import players from '../../../data/players.json'

export default function PlayersTable() {
  const data = players.players as Player[]
  return <>players table</>
}
