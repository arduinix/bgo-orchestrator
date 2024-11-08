import { Icon } from '@chakra-ui/react'
import { FaMedal } from 'react-icons/fa6'
import { OlympicMedalType } from '@enums/enums'

interface OlympicMedalProps {
  medalType?: OlympicMedalType
}

export default function OlympicMedal({
  medalType = OlympicMedalType.none,
}: OlympicMedalProps) {
  const medalColor = () => {
    switch (medalType) {
      case OlympicMedalType.gold:
        return 'gold'
      case OlympicMedalType.silver:
        return 'silver'
      case OlympicMedalType.bronze:
        return '#CD7F32'
      default:
        return 'gray'
    }
  }

  return (
    <>
      {medalType !== OlympicMedalType.none && (
        <Icon color={medalColor()} boxSize={'1.7em'} as={FaMedal} />
      )}
    </>
  )
}
