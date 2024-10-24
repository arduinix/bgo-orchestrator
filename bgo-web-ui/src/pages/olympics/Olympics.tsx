import OlympicsEventChooser from '../../components/olympics-event-chooser/OlympicsEventChooser'
import { Outlet, useParams } from 'react-router-dom'

export default function Olympics() {
  const { id } = useParams()
  return id ? <Outlet /> : <OlympicsEventChooser />
}
