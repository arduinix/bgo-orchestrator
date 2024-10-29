// import { Avatar, Text, Flex } from '@chakra-ui/react'
import { HStack, Stack, Text } from '@chakra-ui/react'
import { Avatar } from '@components/ui/avatar'
import { formatPlayerName } from '@utils/stringConversion'

export default function AvatarNameFlex({ player }: { player: Player }) {
  const playerName = formatPlayerName(player)
  return (
    // <Flex flexDirection='row' gap={3}>
    //   <Avatar.Root src={player.imagePath} size='lg'>
    //     <Avatar.Fallback>{formatPlayerName(player)}</Avatar.Fallback>
    //   </Avatar.Root>
    //   <Flex flexDir={'column'} mt={1.5}>
    //     <Text fontSize='lg' fontWeight='bold'>
    //       {formatPlayerName(player)}
    //     </Text>
    //     <Text ml={0.4} mt={-0.5}>
    //       {player.email}
    //     </Text>
    //   </Flex>
    // </Flex>
    <HStack key={player.email} gap='4'>
      <Avatar name={playerName} size='lg' src={player.imagePath} />
      <Stack gap='0'>
        <Text fontWeight='medium'>{playerName}</Text>
        <Text color='fg.muted' textStyle='sm'>
          {player.email}
        </Text>
      </Stack>
    </HStack>
  )
}
