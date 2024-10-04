import { useState } from 'react'
import { FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react'
export interface EditPlayerFormProps {
  player: Player
  closeAction: () => void
}

export default function EditPlayerForm({
  player,
  closeAction,
}: EditPlayerFormProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  return (
    
    <>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        
        <Input type="email" />

      </FormControl>
    </>
  )
}
