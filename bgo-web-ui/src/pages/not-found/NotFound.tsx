import { Box, Flex, Image, Text } from "@chakra-ui/react";
import mountain from "../../assets/mountain.jpg";

export default function NotFound() {
  return (
    <Box p={2} pt={4} position="relative" minHeight="50vh">
      <Flex
        alignItems="top"
        p={4}
        height="100%"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        flexDirection={"column"}
      >
        <Box
          as="a"
          href={"/"}
          cursor="pointer"
          _hover={{
            bg: "gray.500",
            color: "gray.100",
          }}
        >
          <Flex direction="column" alignItems="center">
            <Image
              src={mountain}
              alt="not_found"
              boxSize={100}
              borderRadius="full"
              mb={4}
            />
            <Box textAlign={"center"}>
              <Text justifyItems={"center"} fontSize={"lg"} fontWeight={"bold"}>
                Oops! That page was not found.
              </Text>
              <Text justifyItems={"center"} fontSize={"sm"} fontWeight={"bold"}>
                Take me home.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
