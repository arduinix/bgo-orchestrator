import { Box, Flex, Image, Text } from "@chakra-ui/react";
import self_small from "../../assets/self_round_cycle.jpg";

export default function Home() {
  return (
    <Box p={2} pt={4} position="relative" minHeight="100vh">
      <Flex
        alignItems="center"
        p={4}
        height="100%"
        position="absolute"
        top="50%"
        left="38%"
        transform="translate(-35%, -50%)"
        flexDirection={"column"}
      >
        <Image
          src={self_small}
          alt="self_small"
          boxSize={["100px", "150px", "200px", "250px"]}
          objectFit="cover"
          borderRadius="full"
          ml={0}
          mr={4}
        />
        <Flex direction="column" justifyContent={"space-between"} mt={3}>
          <Text fontSize={"4xl"} as="b">
            Hi! I'm Nick.
          </Text>
          <Text fontSize={"xl"}>
            Senior Software Engineer, Cyclist, Outdoor Enthusiast, Maker
          </Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Denver, CO
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
