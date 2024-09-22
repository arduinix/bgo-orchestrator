import { Box, Flex } from "@chakra-ui/react";
import ComingSoon from "../../components/coming-soon/ComingSoon";

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
        <ComingSoon />
      </Flex>
    </Box>
  );
}
