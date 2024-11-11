import OlympicsRoundChooser from './round-chooser/OlympicsRoundChooser'
import { Outlet, useParams } from 'react-router-dom'

export default function OlympicsRounds() {
  const { roundId } = useParams()
  return roundId ? <Outlet /> : <OlympicsRoundChooser />
}
