import OlympicsEventChooser from '../../components/olympics-event-chooser/OlympicsEventChooser'
import { Outlet, useParams } from 'react-router-dom'

export default function Olympics() {
  const { eventId } = useParams()
  return eventId ? <Outlet /> : <OlympicsEventChooser />
}
