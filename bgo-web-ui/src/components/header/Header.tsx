import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, Switch, Tooltip } from "@chakra-ui/react";
import self_small from "../../assets/self_round_cycle.jpg";
import { useColorMode } from "@chakra-ui/react";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      h="70"
      // borderBottom="1px"
      // borderBottomColor={"gray.200"}
    >
      <Flex alignItems="center" height="100%" p="10" justifyContent="start">
        <Image
          src={self_small}
          alt="self_small"
          boxSize="50px"
          objectFit="cover"
          borderRadius="full"
          ml={0}
          mr={4}
        />
        <Text fontSize="lg" fontWeight="bold">
          Nick P.
        </Text>
        <Box ml="auto">
          <Tooltip label="Toggle light/dark mode">
            <Switch
              onChange={toggleColorMode}
              checked={colorMode === "light"}
            />
          </Tooltip>
        </Box>
      </Flex>
    </Box>
  );
}
