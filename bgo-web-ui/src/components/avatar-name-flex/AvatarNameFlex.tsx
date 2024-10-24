import { Avatar, Text, Flex } from '@chakra-ui/react'
import { formatPlayerName } from '@utils/stringConversion'

export default function AvatarNameFlex({ player }: { player: Player }) {
  return (
    <Flex flexDirection="row" gap={3}>
      <Avatar
        name={formatPlayerName(player)}
        src={player.imagePath}
        size="lg"
      />
      <Flex flexDir={'column'} mt={1.5}>
        <Text fontSize="lg" fontWeight="bold">
          {formatPlayerName(player)}
        </Text>
        <Text ml={0.4} mt={-0.5}>
          {player.email}
        </Text>
      </Flex>
    </Flex>
  )
}
