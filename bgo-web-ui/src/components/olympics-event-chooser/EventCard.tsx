import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
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
      display={"flex"}
      _hover={{
        boxShadow: "lg",
      }}
    >
      <Box flex={"1"}>
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
        </Stack>
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<RxHamburgerMenu />}
          variant="outline"
        />
        <MenuList>
          <MenuItem>Open</MenuItem>
          <MenuItem>Copy to New</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default EventCard;
