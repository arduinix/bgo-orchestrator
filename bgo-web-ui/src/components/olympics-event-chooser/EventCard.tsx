import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

import torch from "../../assets/image/torch.png";

// interface CardProps {
//   heading: string;
//   description: string;
//   icon: ReactElement;
//   href: string;
// }

interface EventCardProps {
  heading: string;
  description: string;
  href: string;
}

const EventCard = ({ heading, description, href }: EventCardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      as="a"
      href={href}
      p={5}
      _hover={{
        boxShadow: "lg",
      }}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {/* <Icon as={FcDonate} w={10} h={10} /> */}
          <Image src={torch} boxSize={12} objectFit={"scale-down"} />
        </Flex>

        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default EventCard;
