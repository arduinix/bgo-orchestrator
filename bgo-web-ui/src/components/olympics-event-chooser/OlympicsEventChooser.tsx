import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  CardHeader,
  Card,
  CardBody,
  StackDivider,
  Image,
  Divider,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

import EventCard from "./EventCard";

export default function OlympicsEventChooser() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Events
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Get started by creating a new event. Click an existing event to start
          game play and see event details.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <EventCard
            heading={"Heading"}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
            href={"#"}
          />
          <EventCard
            heading={"Heading"}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
            href={"#"}
          />
          <EventCard
            heading={"Heading"}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
            href={"#"}
          />
          <EventCard
            heading={"Heading"}
            description={
              "Lorem ipsum dolor sit amet catetur, adipisicing elit."
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
