import { Box, Flex, Image, Text } from "@chakra-ui/react";
// import panther from "../../assets/looking_panther.jpg";

export default function Home() {
  return (
    <Flex direction="column" alignItems="center" mt={3} justifyContent={"space-between"}>
      <Image
        // src={panther}
        alt="mountain"
        boxSize={["100px", "150px", "200px", "250px"]}
        objectFit="cover"
        borderRadius="full"
        mb={4}
      />
      <Box textAlign={"center"}>
        <Text justifyItems={"center"} fontSize={"2xl"} fontWeight={"bold"}>
          Panther is not quite ready yet.
        </Text>
        <Text justifyItems={"center"} fontSize={"md"} fontWeight={"bold"}>
          We promise that we are hard at work.
        </Text>
      </Box>
    </Flex>
  );
}
