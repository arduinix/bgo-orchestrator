import { useState, useEffect } from 'react'
import {
  Avatar,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
} from '@chakra-ui/react'
import { formatPlayerName } from '@utils/stringConversion'

// const formatPlayerName = (player: Player, includeMiddle: boolean = true) => {
//   const { fName, mInit, lName } = player
//   if (includeMiddle) {
//     return `${fName} ${mInit ? `${mInit}.` : ''} ${lName}`
//   }
//   return `${fName} ${lName}`
// }

export interface EditPlayerFormProps {
  player: Player
  closeAction: () => void
}

export default function EditPlayerForm({
  player,
  closeAction,
}: EditPlayerFormProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    setCurrentPlayer(player)
  }, [player])

  const { fName, lName, imagePath } = currentPlayer || {}

  return (
    <>
      {currentPlayer && (
        <FormControl>
          <Avatar
            name={formatPlayerName(currentPlayer)}
            src={imagePath}
            size={'lg'}
          />
          <Text>{formatPlayerName(currentPlayer)}</Text>
          <FormLabel>First Name</FormLabel>
          <Input type="text" />

          <FormLabel>Middle Initial</FormLabel>
          <Input type="text" />

          <FormLabel>Last Name</FormLabel>
          <Input type="text" />

          <FormLabel>Phone</FormLabel>
          <Input type="text" />

          <FormLabel>Email address</FormLabel>

          <Input type="email" />
        </FormControl>
      )}
    </>
  )
}
